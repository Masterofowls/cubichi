import "dotenv/config";
import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { promisify } from "node:util";
import AdminJSExpress from "@adminjs/express";
import AdminJS, { BaseProperty, BaseResource, ComponentLoader } from "adminjs";
import express from "express";
import { mountPublicApi } from "../server/app.js";
import { readCollection, writeCollection } from "../server/content.js";
const execFileAsync = promisify(execFile);
// ─── File-based data store ───────────────────────────────────────────────────
function readPosts() {
  return readCollection("posts");
}
function writePosts(posts) {
  writeCollection("posts", posts);
}
function makeProperties(schema) {
  return Object.entries(schema).map(([path, property]) => {
    const baseProperty = new BaseProperty({
      path,
      type: property.type,
      isId: property.isId,
      position: property.position,
    });
    if (property.availableValues) {
      baseProperty.availableValues = () => property.availableValues.map(({ value }) => value);
    }
    return baseProperty;
  });
}
function filterEntries(filter) {
  const filters = filter?.filters ?? filter ?? {};
  return Object.entries(filters).map(([path, entry]) => [
    path,
    entry && typeof entry === "object" && "value" in entry ? entry.value : entry,
  ]);
}
function matchesFilter(record, filter) {
  return filterEntries(filter).every(([key, value]) => {
    if (value === undefined || value === null || value === "") return true;
    return String(record[key] ?? "")
      .toLowerCase()
      .includes(String(value).toLowerCase());
  });
}
// ─── AdminJS Custom Resource ──────────────────────────────────────────────────
class PostResource extends BaseResource {
  static isAdapterFor(resource) {
    return resource === PostResource;
  }
  databaseName() {
    return "JSON File";
  }
  id() {
    return "Post";
  }
  properties() {
    return makeProperties({
      id: { type: "string", isId: true, position: 1 },
      title: { type: "string", isTitle: true, position: 2 },
      slug: { type: "string", position: 3 },
      excerpt: { type: "textarea", position: 4 },
      content: { type: "textarea", position: 5 },
      category: {
        type: "string",
        position: 6,
        availableValues: [
          { value: "news", label: "Новости" },
          { value: "article", label: "Статья" },
          { value: "game", label: "Игра" },
          { value: "event", label: "Событие" },
          { value: "promo", label: "Акция" },
        ],
      },
      badge: { type: "string", position: 7 },
      badgeColor: {
        type: "string",
        position: 8,
        availableValues: [
          { value: "blue", label: "🔵 Синий" },
          { value: "sky", label: "🩵 Голубой" },
          { value: "emerald", label: "🟢 Изумрудный" },
          { value: "green", label: "🟩 Зелёный" },
          { value: "orange", label: "🟠 Оранжевый" },
          { value: "red", label: "🔴 Красный" },
          { value: "purple", label: "🟣 Фиолетовый" },
        ],
      },
      images: { type: "textarea", position: 9 },
      videoUrl: { type: "string", position: 10 },
      published: { type: "boolean", position: 11 },
      publishedAt: { type: "datetime", position: 12 },
      createdAt: { type: "datetime", position: 13 },
      updatedAt: { type: "datetime", position: 14 },
    });
  }
  property(path) {
    return this.properties().find((property) => property.name() === path) ?? null;
  }
  async count(filter) {
    const posts = readPosts();
    return this._applyFilter(posts, filter).length;
  }
  async find(filter, params) {
    let posts = readPosts();
    posts = this._applyFilter(posts, filter);
    if (params.sort) {
      const { by, direction } = params.sort;
      posts.sort((a, b) => {
        const av = a[by];
        const bv = b[by];
        const cmp = String(av ?? "").localeCompare(String(bv ?? ""));
        return direction === "desc" ? -cmp : cmp;
      });
    }
    const offset = params.offset ?? 0;
    const limit = params.limit ?? 20;
    return posts.slice(offset, offset + limit).map((p) => this._toRecord(p));
  }
  async findOne(id) {
    const posts = readPosts();
    const post = posts.find((p) => p.id === id);
    return post ? this._toRecord(post) : null;
  }
  async create(params) {
    const posts = readPosts();
    const now = new Date().toISOString();
    const images = this._parseImages(params.images);
    const newPost = {
      id: randomUUID(),
      title: String(params.title ?? ""),
      slug: this._toSlug(String(params.slug ?? params.title ?? "")),
      excerpt: String(params.excerpt ?? ""),
      content: String(params.content ?? ""),
      category: params.category ?? "news",
      badge: String(params.badge ?? ""),
      badgeColor: params.badgeColor ?? "blue",
      images,
      videoUrl: String(params.videoUrl ?? ""),
      published: Boolean(params.published),
      publishedAt: params.published ? String(params.publishedAt ?? now) : "",
      createdAt: now,
      updatedAt: now,
    };
    posts.push(newPost);
    writePosts(posts);
    return this._toRecord(newPost);
  }
  async update(id, params) {
    const posts = readPosts();
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Post ${id} not found`);
    const now = new Date().toISOString();
    const images =
      params.images !== undefined ? this._parseImages(params.images) : posts[idx].images;
    const wasUnpublished = !posts[idx].published;
    const nowPublished = Boolean(params.published);
    const updated = {
      ...posts[idx],
      ...params,
      images,
      publishedAt:
        wasUnpublished && nowPublished
          ? now
          : String(params.publishedAt ?? posts[idx].publishedAt ?? ""),
      updatedAt: now,
    };
    posts[idx] = updated;
    writePosts(posts);
    return this._toRecord(updated);
  }
  async delete(id) {
    const posts = readPosts();
    const filtered = posts.filter((p) => p.id !== id);
    writePosts(filtered);
  }
  // ─── Helpers ──────────────────────────────────────────────────────────────
  _applyFilter(posts, filter) {
    return posts.filter((post) => matchesFilter(post, filter));
  }
  _toRecord(post) {
    return this.build({
      ...post,
      images: JSON.stringify(post.images ?? []),
    });
  }
  _parseImages(raw) {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      // fall through
    }
    return raw
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  _toSlug(text) {
    return text
      .toLowerCase()
      .replace(/[а-яёА-ЯЁ]/g, (ch) => {
        const map = {
          а: "a",
          б: "b",
          в: "v",
          г: "g",
          д: "d",
          е: "e",
          ё: "yo",
          ж: "zh",
          з: "z",
          и: "i",
          й: "y",
          к: "k",
          л: "l",
          м: "m",
          н: "n",
          о: "o",
          п: "p",
          р: "r",
          с: "s",
          т: "t",
          у: "u",
          ф: "f",
          х: "kh",
          ц: "ts",
          ч: "ch",
          ш: "sh",
          щ: "sch",
          ъ: "",
          ы: "y",
          ь: "",
          э: "e",
          ю: "yu",
          я: "ya",
        };
        return map[ch.toLowerCase()] ?? "";
      })
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
}

class TemplateResource extends BaseResource {
  databaseName() {
    return "JSON File";
  }
  id() {
    return this.constructor.resourceName;
  }
  properties() {
    return makeProperties(this.constructor.fields);
  }
  property(path) {
    return this.properties().find((property) => property.name() === path) ?? null;
  }
  _read() {
    return readCollection(this.constructor.collectionName);
  }
  _write(records) {
    writeCollection(this.constructor.collectionName, records);
  }
  _filtered(records, filter) {
    return records.filter((record) => matchesFilter(record, filter));
  }
  async count(filter) {
    return this._filtered(this._read(), filter).length;
  }
  async find(filter, params) {
    let records = this._filtered(this._read(), filter);
    if (params.sort) {
      const { by, direction } = params.sort;
      records = records.sort((a, b) => {
        const result = String(a[by] ?? "").localeCompare(String(b[by] ?? ""));
        return direction === "desc" ? -result : result;
      });
    }
    const offset = params.offset ?? 0;
    const limit = params.limit ?? 20;
    return records.slice(offset, offset + limit).map((record) => this.build(record));
  }
  async findOne(id) {
    const record = this._read().find((item) => item.id === id);
    return record ? this.build(record) : null;
  }
  async create(params) {
    const records = this._read();
    const now = new Date().toISOString();
    const fields = Object.keys(this.constructor.fields).filter(
      (name) => !["id", "createdAt", "updatedAt"].includes(name),
    );
    const record = Object.fromEntries(fields.map((name) => [name, params[name] ?? ""]));
    record.id = randomUUID();
    record.slug = String(record.slug || record.title)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
    record.published = record.published === true || record.published === "true";
    record.createdAt = now;
    record.updatedAt = now;
    records.push(record);
    this._write(records);
    return record;
  }
  async update(id, params) {
    const records = this._read();
    const index = records.findIndex((record) => record.id === id);
    if (index < 0) throw new Error(`${this.id()} record ${id} not found`);
    const allowedFields = Object.keys(this.constructor.fields).filter(
      (name) => !["id", "createdAt", "updatedAt"].includes(name),
    );
    const updates = Object.fromEntries(
      allowedFields
        .filter((name) => params[name] !== undefined)
        .map((name) => [
          name,
          name === "published" ? params[name] === true || params[name] === "true" : params[name],
        ]),
    );
    const updated = {
      ...records[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    records[index] = updated;
    this._write(records);
    return updated;
  }
  async delete(id) {
    this._write(this._read().filter((record) => record.id !== id));
  }
}

class ProductResource extends TemplateResource {
  static isAdapterFor(resource) {
    return resource === ProductResource;
  }
}
ProductResource.resourceName = "Product";
ProductResource.collectionName = "products";
ProductResource.fields = {
  id: { type: "string", isId: true, position: 1 },
  title: { type: "string", isTitle: true, position: 2 },
  slug: { type: "string", position: 3, description: "URL-адрес товара." },
  description: { type: "textarea", position: 4 },
  age: { type: "string", position: 5 },
  price: { type: "string", position: 6, description: "Оставьте пустым, если цена уточняется." },
  image: {
    type: "string",
    position: 7,
    description: "Путь к изображению, например /images/product.jpg.",
  },
  href: {
    type: "string",
    position: 8,
    description: "Ссылка на страницу товара, например /cards/.",
  },
  gradient: {
    type: "string",
    position: 9,
    availableValues: [
      { value: "from-emerald-500 to-teal-500", label: "Изумрудный" },
      { value: "from-orange-500 to-amber-500", label: "Тёплый оранжевый" },
      { value: "from-violet-500 to-purple-500", label: "Фиолетовый" },
    ],
  },
  published: { type: "boolean", position: 10 },
  createdAt: { type: "datetime", position: 11 },
  updatedAt: { type: "datetime", position: 12 },
};

class LearningResource extends TemplateResource {
  static isAdapterFor(resource) {
    return resource === LearningResource;
  }
}
LearningResource.resourceName = "Learning";
LearningResource.collectionName = "learning";
LearningResource.fields = {
  id: { type: "string", isId: true, position: 1 },
  title: { type: "string", isTitle: true, position: 2 },
  slug: { type: "string", position: 3 },
  summary: { type: "textarea", position: 4 },
  subject: { type: "string", position: 5 },
  ageRange: { type: "string", position: 6 },
  content: {
    type: "textarea",
    position: 7,
    description: "Текст учебного материала в формате Markdown.",
  },
  published: { type: "boolean", position: 8 },
  createdAt: { type: "datetime", position: 9 },
  updatedAt: { type: "datetime", position: 10 },
};

// ─── AdminJS Adapter ──────────────────────────────────────────────────────────
class JsonDatabase {
  static isAdapterFor() {
    return false;
  }
}
AdminJS.registerAdapter({ Resource: PostResource, Database: JsonDatabase });
AdminJS.registerAdapter({ Resource: ProductResource, Database: JsonDatabase });
AdminJS.registerAdapter({ Resource: LearningResource, Database: JsonDatabase });
const componentLoader = new ComponentLoader();
const dashboardComponent = componentLoader.add(
  "Dashboard",
  resolve(process.cwd(), "admin", "dashboard.jsx"),
);
// ─── AdminJS Instance ─────────────────────────────────────────────────────────
const adminJs = new AdminJS({
  resources: [
    {
      resource: PostResource,
      options: {
        navigation: { name: "Контент", icon: "Edit" },
        listProperties: ["title", "category", "badge", "published", "publishedAt"],
        editProperties: [
          "title",
          "slug",
          "excerpt",
          "content",
          "category",
          "badge",
          "badgeColor",
          "images",
          "videoUrl",
          "published",
        ],
        showProperties: [
          "title",
          "slug",
          "excerpt",
          "content",
          "category",
          "badge",
          "badgeColor",
          "images",
          "videoUrl",
          "published",
          "publishedAt",
          "createdAt",
          "updatedAt",
        ],
        filterProperties: ["title", "category", "published"],
        properties: {
          content: {
            type: "textarea",
            description:
              "Текст в формате Markdown. Поддерживаются **жирный**, *курсив*, # заголовки, - списки, таблицы.",
          },
          images: {
            type: "textarea",
            description:
              "URLs изображений — по одному на строку или через запятую. Например: /images/photo.jpg",
          },
          slug: {
            description:
              "URL-адрес поста (латиница, цифры, дефисы). Оставьте пустым — заполнится автоматически.",
          },
        },
        actions: {
          new: { actionType: "resource", label: "+ Новый пост" },
          edit: { actionType: "record", label: "Редактировать" },
          delete: { actionType: "record", label: "Удалить" },
          show: { actionType: "record", label: "Просмотр" },
          list: { actionType: "resource", label: "Все посты" },
          runDiagnostics: {
            actionType: "resource",
            label: "Автотесты сайта и почты",
            handler: async () => {
              try {
                const { stdout, stderr } = await execFileAsync(
                  process.execPath,
                  [
                    "--experimental-vm-modules",
                    resolve(process.cwd(), "node_modules", "jest", "bin", "jest.js"),
                    "--runInBand",
                  ],
                  {
                    cwd: process.cwd(),
                    timeout: 180_000,
                    maxBuffer: 2 * 1024 * 1024,
                    env: { ...process.env, RUN_LIVE_EMAIL_TEST: "true" },
                  },
                );
                const output = `${stdout}\n${stderr}`.trim().slice(-2500);
                return {
                  notice: {
                    message: output || "Все проверки пройдены.",
                    type: "success",
                  },
                };
              } catch (error) {
                const output =
                  error && typeof error === "object" && "stdout" in error
                    ? `${String(error.stdout)}\n${String(error.stderr ?? "")}`.trim()
                    : error instanceof Error
                      ? error.message
                      : String(error);
                return {
                  notice: {
                    message: (output || "Автотесты завершились с ошибкой.").slice(-2500),
                    type: "error",
                  },
                };
              }
            },
          },
        },
      },
    },
    {
      resource: ProductResource,
      options: {
        navigation: { name: "Каталог", icon: "ShoppingBag" },
        listProperties: ["title", "age", "price", "published"],
        editProperties: [
          "title",
          "slug",
          "description",
          "age",
          "price",
          "image",
          "gradient",
          "published",
        ],
        showProperties: [
          "title",
          "slug",
          "description",
          "age",
          "price",
          "image",
          "gradient",
          "published",
          "createdAt",
          "updatedAt",
        ],
        filterProperties: ["title", "age", "published"],
        properties: {
          gradient: {
            availableValues: [
              { value: "from-emerald-500 to-teal-500", label: "Изумрудный" },
              { value: "from-orange-500 to-amber-500", label: "Тёплый оранжевый" },
              { value: "from-violet-500 to-purple-500", label: "Фиолетовый" },
            ],
          },
        },
        actions: {
          new: { actionType: "resource", label: "+ Новый товар" },
          edit: { actionType: "record", label: "Редактировать" },
          delete: { actionType: "record", label: "Удалить" },
          show: { actionType: "record", label: "Просмотр" },
          list: { actionType: "resource", label: "Все товары" },
        },
      },
    },
    {
      resource: LearningResource,
      options: {
        navigation: { name: "Учебные материалы", icon: "BookOpen" },
        listProperties: ["title", "subject", "ageRange", "published"],
        editProperties: ["title", "slug", "summary", "subject", "ageRange", "content", "published"],
        showProperties: [
          "title",
          "slug",
          "summary",
          "subject",
          "ageRange",
          "content",
          "published",
          "createdAt",
          "updatedAt",
        ],
        filterProperties: ["title", "subject", "published"],
        properties: {
          content: {
            description:
              "Учебный текст в формате Markdown. Используйте заголовки, списки и короткие разделы.",
          },
        },
        actions: {
          new: { actionType: "resource", label: "+ Новый материал" },
          edit: { actionType: "record", label: "Редактировать" },
          delete: { actionType: "record", label: "Удалить" },
          show: { actionType: "record", label: "Просмотр" },
          list: { actionType: "resource", label: "Все материалы" },
        },
      },
    },
  ],
  branding: {
    companyName: "Кубики-Самоучки",
    logo: false,
    favicon: "/images/pwa-icon.svg",
    theme: {
      colors: {
        primary100: "#173b35",
        primary80: "#1f5344",
        primary60: "#537c66",
        primary40: "#9fb8a6",
        primary20: "#e7efe8",
        accent: "#b67b32",
        love: "#a74332",
        filterBg: "#fffaf1",
        containerBorder: "#e6e1d5",
        border: "#e6e1d5",
      },
    },
  },
  locale: {
    language: "ru",
    availableLanguages: ["ru"],
    translations: {
      ru: {
        actions: {
          new: "Новый пост",
          edit: "Редактировать",
          delete: "Удалить",
          show: "Просмотр",
          list: "Список",
        },
        buttons: {
          save: "Сохранить",
          addNewItem: "Добавить",
          filter: "Фильтр",
          applyChanges: "Применить",
          resetFilter: "Сбросить",
          confirmRemovalMany_1: "Удалить {{count}} запись",
          confirmRemovalMany_2: "Удалить {{count}} записи",
          confirmRemovalMany_5: "Удалить {{count}} записей",
          logout: "Выйти",
          login: "Войти",
          seeTheDocumentation: "Документация",
          createFirstRecord: "Создать первый пост",
        },
        labels: {
          Post: "Посты",
          Product: "Товары",
          Learning: "Учебные материалы",
        },
        messages: {
          successfullyBulkDeleted_1: "Удалена {{count}} запись",
          successfullyBulkDeleted_2: "Удалены {{count}} записи",
          successfullyBulkDeleted_5: "Удалено {{count}} записей",
          successfullyDeleted: "Запись удалена",
          successfullyUpdated: "Изменения сохранены",
          successfullyCreated: "Пост создан",
          thereWereValidationErrors: "Исправьте ошибки",
          loginWelcome: "Войдите в панель управления",
        },
      },
    },
  },
  dashboard: {
    component: dashboardComponent,
  },
  componentLoader,
  rootPath: "/admin",
});
await adminJs.initialize();
// ─── Express App ──────────────────────────────────────────────────────────────
const app = express();
const ADMIN_COOKIE_SECRET = process.env.ADMIN_COOKIE_SECRET;
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
if (!ADMIN_COOKIE_SECRET || ADMIN_COOKIE_SECRET.length < 32) {
  throw new Error("Set ADMIN_COOKIE_SECRET to a random value of at least 32 characters.");
}
if (!ADMIN_USER || !ADMIN_PASS) {
  throw new Error("Set ADMIN_USER and ADMIN_PASS before starting AdminJS.");
}
const router = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      if (email === ADMIN_USER && password === ADMIN_PASS) {
        return { email, id: "1" };
      }
      return null;
    },
    cookieName: "cubichi_admin",
    cookiePassword: ADMIN_COOKIE_SECRET,
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
    secret: ADMIN_COOKIE_SECRET,
  },
);
app.get("/admin/frontend/assets/components.bundle.js", (_req, res, next) => {
  res.sendFile(resolve(process.cwd(), ".adminjs", "bundle.js"), (error) => {
    if (error) next(error);
  });
});
app.use(adminJs.options.rootPath, router);
mountPublicApi(app);
// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", posts: readPosts().length });
});
const PORT = Number(process.env.PORT ?? process.env.ADMIN_PORT ?? 3001);
app.listen(PORT, () => {
  console.log(`\n🎲 Кубики-Самоучки — Панель управления`);
  console.log(`   URL:      http://localhost:${PORT}/admin`);
  console.log(`   Логин:    ${ADMIN_USER}`);
  console.log(`   Данные:   data/posts.json\n`);
});
