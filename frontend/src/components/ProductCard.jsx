export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p className="category">{product.category}</p>
      <p className="price">{product.price.toFixed(2)} €</p>
    </div>
  );
}
