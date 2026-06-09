const API_URL = "/api/products";

export async function fetchProducts({ page, limit, category, sort, order }) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
    order,
  });

  if (category) {
    params.set("category", category);
  }

  const response = await fetch(`${API_URL}?${params}`);
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error || "Erreur lors du chargement des produits");
  }

  return body;
}
