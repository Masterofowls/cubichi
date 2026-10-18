import products from "../../data/products.json";
import learning from "../../data/learning.json";

export const initialProducts = products.filter((item) => item.published);
export const initialLearningMaterials = learning.filter((item) => item.published);

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export async function fetchCollection(name) {
  const response = await fetch(`${API_BASE_URL}/api/${name}`);
  if (!response.ok) {
    throw new Error(`Не удалось загрузить материалы (${response.status}).`);
  }
  const records = await response.json();
  if (!Array.isArray(records)) {
    throw new Error("Сервер вернул некорректный список материалов.");
  }
  return records;
}

export async function fetchPost(slug) {
  const response = await fetch(`${API_BASE_URL}/api/posts/${encodeURIComponent(slug)}`);
  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? "Публикация не найдена."
        : `Не удалось загрузить публикацию (${response.status}).`,
    );
  }
  return response.json();
}
