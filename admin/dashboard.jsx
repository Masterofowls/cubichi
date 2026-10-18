import { ApiClient } from "adminjs";
import { useState } from "react";

const api = new ApiClient();

export default function Dashboard() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  async function runChecks() {
    setRunning(true);
    setResult({
      type: "info",
      message: "Проверяем сайт, форму, медиа и отправку тестового письма…",
    });
    try {
      const response = await api.resourceAction({
        resourceId: "Post",
        actionName: "runDiagnostics",
        data: {},
      });
      setResult(
        response.data.notice ?? {
          type: "success",
          message: "Автотесты завершены.",
        },
      );
    } catch (error) {
      setResult({
        type: "error",
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setRunning(false);
    }
  }

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 24px", color: "#173b35" }}>
      <p
        style={{
          color: "#a36d2e",
          fontWeight: 700,
          letterSpacing: ".08em",
          textTransform: "uppercase",
        }}
      >
        Кубики-Самоучки
      </p>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Панель управления</h1>
      <p style={{ color: "#61716a", marginTop: 0 }}>
        Управляйте публикациями и запускайте проверку сайта перед обновлением.
      </p>
      <section
        style={{
          marginTop: 32,
          padding: 24,
          border: "1px solid #e6e1d5",
          borderRadius: 16,
          background: "#fffdf8",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Автоматическая проверка</h2>
        <p style={{ color: "#61716a", lineHeight: 1.6 }}>
          Jest + Supertest проверят загрузку главной страницы и медиафайлов, работу API формы и
          доставку отдельного тестового письма на gurevich_lena@mail.ru. Реальные заказы не
          создаются.
        </p>
        <button
          type="button"
          onClick={runChecks}
          disabled={running}
          style={{
            border: 0,
            borderRadius: 10,
            padding: "12px 18px",
            background: running ? "#87998e" : "#1f5344",
            color: "white",
            font: "inherit",
            fontWeight: 700,
            cursor: running ? "wait" : "pointer",
          }}
        >
          {running ? "Проверяем…" : "Запустить автотесты"}
        </button>
        {result && (
          <pre
            role="status"
            style={{
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              marginTop: 20,
              padding: 16,
              borderRadius: 10,
              background: result.type === "error" ? "#fff0ec" : "#edf4ee",
              color: result.type === "error" ? "#8d2e20" : "#173b35",
              fontFamily: "inherit",
              lineHeight: 1.5,
            }}
          >
            {result.message}
          </pre>
        )}
      </section>
      <section style={{ marginTop: 24 }}>
        <h2>Шаблоны контента</h2>
        <p style={{ color: "#61716a" }}>
          В разделе «Контент → Посты» создавайте новости и статьи по шаблону. В «Каталоге»
          добавляйте товары, а в «Учебных материалах» — новые методические заметки. Публикации и
          учебный текст поддерживают Markdown; для карточек предусмотрены краткое описание, возраст
          и тематический цвет.
        </p>
      </section>
    </main>
  );
}
