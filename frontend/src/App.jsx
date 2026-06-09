import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";

export default function App() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const { products, pagination, loading, error } = useProducts({
    page,
    limit,
    category,
    sort,
    order,
  });

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    setPage(1);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Catalogue produits</h1>
        <div className="filters">
          <select value={category} onChange={handleCategoryChange}>
            <option value="">Toutes categories</option>
            <option value="shoes">Chaussures</option>
            <option value="clothing">Vetements</option>
            <option value="accessories">Accessoires</option>
            <option value="bags">Sacs</option>
          </select>
          <select value={sort} onChange={handleSortChange}>
            <option value="createdAt">Date</option>
            <option value="price">Prix</option>
            <option value="name">Nom</option>
          </select>
          <select value={order} onChange={handleOrderChange}>
            <option value="asc">Croissant</option>
            <option value="desc">Decroissant</option>
          </select>
        </div>
      </div>

      {loading && <p className="loading">Chargement...</p>}
      {error && <p className="error">Erreur : {error}</p>}

      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <p className="empty">Aucun produit trouve.</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          <Pagination pagination={pagination} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
