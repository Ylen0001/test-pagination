const CATEGORY_LABELS = {
  shoes: "Chaussures",
  clothing: "Vetements",
  accessories: "Accessoires",
  bags: "Sacs",
};

export default function ProductCard({ product }) {
  const categoryLabel =
    CATEGORY_LABELS[product.category] ?? product.category;

  return (
    <article className="product-card">
      <p className="category">{categoryLabel}</p>
      <h2 className="product-name">{product.name}</h2>
      <p className="price">{Number(product.price).toFixed(2)} €</p>
    </article>
  );
}
