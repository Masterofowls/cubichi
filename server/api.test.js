import { jest, describe, expect, test, beforeEach } from "@jest/globals";
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import request from "supertest";
import { createApp } from "./app.js";
import { createMailTransport, sendTestEmail, ORDER_RECIPIENT } from "./api.js";
import { readCollection, writeCollection } from "./content.js";

const transport = {
  options: { auth: { user: "sender@mail.ru" } },
  sendMail: jest.fn().mockResolvedValue({ messageId: "test-message" }),
};
const logger = { error: jest.fn() };
const app = createApp({ transport, logger });

beforeEach(() => {
  transport.sendMail.mockClear();
  logger.error.mockClear();
});

describe("static website and media", () => {
  test("serves the main page with Open Graph metadata and the React app shell", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toContain('property="og:title"');
    expect(response.text).toContain('id="root"');
  });

  test("loads the production JavaScript bundle containing the order form", async () => {
    const page = await request(app).get("/");
    const scriptPath = page.text.match(/<script[^>]+src="([^"]+\.js)"[^>]*>/)?.[1];

    expect(scriptPath).toBeTruthy();
    const entry = await request(app).get(scriptPath);
    expect(entry.status).toBe(200);
    const bundleNames = readdirSync(resolve(process.cwd(), "out", "assets")).filter((name) =>
      name.endsWith(".js"),
    );
    const bundles = await Promise.all(
      bundleNames.map((name) => request(app).get(`/assets/${name}`)),
    );
    expect(bundles.every((bundle) => bundle.status === 200)).toBe(true);
    expect(
      bundles.some(
        (bundle) => bundle.text.includes("/api/orders") && bundle.text.includes("Отправить заявку"),
      ),
    ).toBe(true);
  });

  test.each([
    ["/images/seminar-map.jpg", "image/jpeg"],
    ["/images/og-preview.png", "image/png"],
    ["/images/cards-self-study/card-deck-box.webp", "image/webp"],
    ["/images/cards-self-study/card-samples-leaf.webp", "image/webp"],
    ["/images/cards-self-study/card-samples-wizard.webp", "image/webp"],
    ["/images/cards-self-study/card-samples-bag.webp", "image/webp"],
    ["/images/cards-self-study/card-samples-dog.webp", "image/webp"],
    ["/images/cards-self-study/card-samples-birds.webp", "image/webp"],
    ["/media/0813.mp4", "video/mp4"],
  ])("serves media asset %s", async (path, contentType) => {
    const response = await request(app).head(path);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain(contentType);
  });
});

describe("order form API", () => {
  test("accepts an order and sends it to the configured mailbox", async () => {
    const response = await request(app).post("/api/orders").send({
      name: "Елена",
      phone: "+7 921 123-45-67",
      email: "customer@example.ru",
      product: "Кубики-Самоучки",
      message: "Позвоните после 17:00",
    });

    expect(response.status).toBe(202);
    expect(transport.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ORDER_RECIPIENT,
        replyTo: "customer@example.ru",
        text: expect.stringContaining("Позвоните после 17:00"),
      }),
    );
  });

  test("rejects invalid submissions without sending mail", async () => {
    const response = await request(app).post("/api/orders").send({ name: "", phone: "abc" });

    expect(response.status).toBe(400);
    expect(transport.sendMail).not.toHaveBeenCalled();
  });

  test("reports delivery errors instead of confirming an unsent order", async () => {
    transport.sendMail.mockRejectedValueOnce(new Error("SMTP offline"));

    const response = await request(app)
      .post("/api/orders")
      .send({ name: "Елена", phone: "+7 921 123-45-67" });

    expect(response.status).toBe(502);
    expect(response.body.error).toMatch(/не удалось отправить/i);
    expect(logger.error).toHaveBeenCalled();
  });
});

describe("admin-managed content API", () => {
  test("serves published products and educational materials", async () => {
    const [products, learning] = await Promise.all([
      request(app).get("/api/products"),
      request(app).get("/api/learning"),
    ]);

    expect(products.status).toBe(200);
    expect(products.body.some((item) => item.title === "Падежи и склонения")).toBe(true);
    expect(
      products.body.some(
        (item) =>
          item.title === "Слушай и выбирай — карточки-самоучки" &&
          item.href === "/cards/" &&
          item.image.includes("card-deck-box.webp"),
      ),
    ).toBe(true);
    expect(learning.status).toBe(200);
    expect(learning.body.some((item) => item.subject === "Методика")).toBe(true);
  });

  test("reads seed content and saves edits on the configured persistent disk", () => {
    const initialProducts = readCollection("products");
    const dataDirectory = mkdtempSync(join(tmpdir(), "cubichi-data-"));
    const previousDataDirectory = process.env.DATA_DIR;

    try {
      process.env.DATA_DIR = dataDirectory;
      expect(readCollection("products")).toEqual(initialProducts);

      const editedProducts = [...initialProducts, { id: "render-disk-test", published: true }];
      writeCollection("products", editedProducts);

      expect(readCollection("products")).toEqual(editedProducts);
      expect(JSON.parse(readFileSync(join(dataDirectory, "products.json"), "utf-8"))).toEqual(
        editedProducts,
      );
    } finally {
      if (previousDataDirectory === undefined) {
        delete process.env.DATA_DIR;
      } else {
        process.env.DATA_DIR = previousDataDirectory;
      }
      rmSync(dataDirectory, { recursive: true, force: true });
    }
  });
});

const runLiveEmailTest = process.env.RUN_LIVE_EMAIL_TEST === "true";
const liveEmailTest = runLiveEmailTest ? test : test.skip;

liveEmailTest("sends a separate SMTP test message to the site mailbox", async () => {
  const smtpTransport = createMailTransport();
  const result = await sendTestEmail(smtpTransport);
  expect(result.messageId).toBeTruthy();
});
