import { Router } from "express";
import nodemailer from "nodemailer";
import { readCollection } from "./content.js";

export const ORDER_RECIPIENT = "gurevich_lena@mail.ru";

const MAX_LENGTHS = {
  name: 120,
  phone: 40,
  email: 254,
  product: 160,
  message: 3000,
};

export function createMailTransport(env = process.env) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = env;
  const port = Number(env.SMTP_PORT);

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !Number.isInteger(port)) {
    throw new Error("SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS must be configured");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: env.SMTP_SECURE === "true" || (env.SMTP_SECURE !== "false" && port === 465),
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function sendTestEmail(transport, recipient = ORDER_RECIPIENT) {
  return transport.sendMail({
    from: transport.options?.auth?.user ?? process.env.SMTP_USER,
    to: recipient,
    subject: "[ТЕСТ] Проверка почты Кубики-Самоучки",
    text: "Это тестовое письмо из панели администратора. Это не заказ.",
  });
}

function validateOrder(body) {
  const values = {
    name: String(body.name ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    email: String(body.email ?? "").trim(),
    product: String(body.product ?? "").trim(),
    message: String(body.message ?? "").trim(),
  };

  if (!values.name || !values.phone) {
    return "Укажите имя и номер телефона.";
  }

  for (const [key, maxLength] of Object.entries(MAX_LENGTHS)) {
    if (values[key].length > maxLength) {
      return `Поле "${key}" слишком длинное.`;
    }
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return "Проверьте адрес электронной почты.";
  }

  if (!/^[+()\d\s.-]{7,40}$/.test(values.phone)) {
    return "Проверьте номер телефона.";
  }

  if (body.website) {
    return "Не удалось принять заявку.";
  }

  return values;
}

function orderText(order) {
  return [
    "Новая заявка с сайта cubichi.ru",
    "",
    `Имя: ${order.name}`,
    `Телефон: ${order.phone}`,
    `Email: ${order.email || "не указан"}`,
    `Товар: ${order.product || "не выбран"}`,
    `Комментарий: ${order.message || "нет"}`,
  ].join("\n");
}

export function createApiRouter({ transport, recipient = ORDER_RECIPIENT, logger = console } = {}) {
  const router = Router();

  router.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  const sendPublishedCollection = (collection, res) => {
    try {
      const records = readCollection(collection).filter((record) => record.published);
      return res.json(records);
    } catch (error) {
      logger.error(`Unable to read ${collection} content`, error);
      return res.status(500).json({ error: "Не удалось загрузить материалы сайта." });
    }
  };

  for (const collection of ["posts", "products", "learning"]) {
    router.get(`/${collection}`, (_req, res) => sendPublishedCollection(collection, res));
  }

  router.get("/posts/:slug", (req, res) => {
    try {
      const post = readCollection("posts").find(
        (record) => record.slug === req.params.slug && record.published,
      );
      if (!post) return res.status(404).json({ error: "Публикация не найдена." });
      return res.json(post);
    } catch (error) {
      logger.error("Unable to read post content", error);
      return res.status(500).json({ error: "Не удалось загрузить публикацию." });
    }
  });

  router.post("/orders", async (req, res) => {
    const order = validateOrder(req.body ?? {});
    if (typeof order === "string") {
      return res.status(400).json({ error: order });
    }

    try {
      const mailTransport = transport ?? createMailTransport();
      await mailTransport.sendMail({
        from: mailTransport.options?.auth?.user ?? process.env.SMTP_USER,
        to: recipient,
        replyTo: order.email || undefined,
        subject: `Заявка с сайта: ${order.product || "Кубики-Самоучки"}`,
        text: orderText(order),
      });
      return res.status(202).json({ message: "Заявка отправлена." });
    } catch (error) {
      logger.error("Order email delivery failed", error);
      return res.status(502).json({
        error: "Не удалось отправить заявку. Попробуйте позже или позвоните нам.",
      });
    }
  });

  return router;
}
