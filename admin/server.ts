import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import AdminJSExpress from "@adminjs/express";
import AdminJS from "adminjs";
import express from "express";
import type { BadgeColor, Post, PostCategory } from "../src/types/post.js";

// ─── File-based data store ───────────────────────────────────────────────────
const DATA_FILE = resolve(process.cwd(), "data", "posts.json");

function readPosts(): Post[] {
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf-8")) as Post[];
  } catch {
    return [];
  }
}

function writePosts(posts: Post[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), "utf-8");
}

// ─── AdminJS Custom Resource ──────────────────────────────────────────────────
class PostResource {
  static isAdapterFor(resource: unknown) {
    return resource === PostResource;
  }

  databaseName() {
    return "JSON File";
  }

  id() {
    return "Post";
  }

  properties() {
    return {
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
    };
  }

  async count(filter: Record<string, unknown>) {
    const posts = readPosts();
    return this._applyFilter(posts, filter).length;
  }

  async find(
    filter: Record<string, unknown>,
    params: {
      limit?: number;
      offset?: number;
      sort?: { by: string; direction: "asc" | "desc" };
    },
  ) {
    let posts = readPosts();
    posts = this._applyFilter(posts, filter);
    if (params.sort) {
      const { by, direction } = params.sort;
      posts.sort((a, b) => {
        const av = (a as unknown as Record<string, unknown>)[by];
        const bv = (b as unknown as Record<string, unknown>)[by];
        const cmp = String(av ?? "").localeCompare(String(bv ?? ""));
        return direction === "desc" ? -cmp : cmp;
      });
    }
    const offset = params.offset ?? 0;
    const limit = params.limit ?? 20;
    return posts.slice(offset, offset + limit).map((p) => this._toRecord(p));
  }

  async findOne(id: string) {
    const posts = readPosts();
    const post = posts.find((p) => p.id === id);
    return post ? this._toRecord(post) : null;
  }

  async create(params: Record<string, unknown>) {
    const posts = readPosts();
    const now = new Date().toISOString();
    const images = this._parseImages(params.images as string);
    const newPost: Post = {
      id: randomUUID(),
      title: String(params.title ?? ""),
      slug: this._toSlug(String(params.slug ?? params.title ?? "")),
      excerpt: String(params.excerpt ?? ""),
      content: String(params.content ?? ""),
      category: (params.category as PostCategory) ?? "news",
      badge: String(params.badge ?? ""),
      badgeColor: (params.badgeColor as BadgeColor) ?? "blue",
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

  async update(id: string, params: Record<string, unknown>) {
    const posts = readPosts();
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Post ${id} not found`);
    const now = new Date().toISOString();
    const images =
      params.images !== undefined
        ? this._parseImages(params.images as string)
        : posts[idx].images;
    const wasUnpublished = !posts[idx].published;
    const nowPublished = Boolean(params.published);
    const updated: Post = {
      ...posts[idx],
      ...(params as Partial<Post>),
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

  async delete(id: string) {
    const posts = readPosts();
    const filtered = posts.filter((p) => p.id !== id);
    writePosts(filtered);
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────
  private _applyFilter(posts: Post[], filter: Record<string, unknown>): Post[] {
    if (!filter || Object.keys(filter).length === 0) return posts;
    return posts.filter((p) =>
      Object.entries(filter).every(([key, val]) => {
        if (val === undefined || val === null || val === "") return true;
        return String((p as unknown as Record<string, unknown>)[key])
          .toLowerCase()
          .includes(String(val).toLowerCase());
      }),
    );
  }

  private _toRecord(post: Post) {
    return {
      ...post,
      images: JSON.stringify(post.images ?? []),
    };
  }

  private _parseImages(raw: string): string[] {
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

  private _toSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[а-яёА-ЯЁ]/g, (ch) => {
        const map: Record<string, string> = {
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

// ─── AdminJS Adapter ──────────────────────────────────────────────────────────
const jsonAdapter = {
  Resource: PostResource,
  Database: class JsonDatabase {
    static isAdapterFor() {
      return false;
    }
  },
};

AdminJS.registerAdapter(jsonAdapter);

// ─── AdminJS Instance ─────────────────────────────────────────────────────────
const adminJs = new AdminJS({
  resources: [
    {
      resource: PostResource,
      options: {
        navigation: { name: "Контент", icon: "Edit" },
        listProperties: [
          "title",
          "category",
          "badge",
          "published",
          "publishedAt",
        ],
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
        },
      },
    },
  ],
  branding: {
    companyName: "Кубики-Самоучки",
    logo: false,
    favicon: "/images/og-preview.jpg",
    theme: {
      colors: {
        primary100: "#0ea5e9",
        primary80: "#38bdf8",
        primary60: "#7dd3fc",
        primary40: "#bae6fd",
        primary20: "#e0f2fe",
        accent: "#0ea5e9",
        love: "#ef4444",
        filterBg: "#f8fafc",
        containerBorder: "#e2e8f0",
        border: "#e2e8f0",
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
    component: undefined,
  },
  rootPath: "/admin",
});

await adminJs.initialize();

// ─── Express App ──────────────────────────────────────────────────────────────
const app = express();

const ADMIN_COOKIE_SECRET =
  process.env.ADMIN_COOKIE_SECRET ?? "cubichi-super-secret-change-me";
const ADMIN_USER = process.env.ADMIN_USER ?? "admin";
const ADMIN_PASS = process.env.ADMIN_PASS ?? "cubichi2025";

const router = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email: string, password: string) => {
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

app.use(adminJs.options.rootPath, router);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", posts: readPosts().length });
});

const PORT = Number(process.env.ADMIN_PORT ?? 3001);

app.listen(PORT, () => {
  console.log(`\n🎲 Кубики-Самоучки — Панель управления`);
  console.log(`   URL:      http://localhost:${PORT}/admin`);
  console.log(`   Логин:    ${ADMIN_USER}`);
  console.log(`   Пароль:   ${ADMIN_PASS}`);
  console.log(`   Данные:   data/posts.json\n`);
});
