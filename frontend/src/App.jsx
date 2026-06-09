import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import ProductCard from "./components/ProductCard";
import LoadMore from "./components/LoadMore";

export default function App() {
  const [limit] = useState(10);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const {
    products,
    pagination,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  } = useProducts({ limit, category, sort, order });

  return (
    <div className="app">
      <div className="header">
        <h1>Catalogue produits</h1>
        <div className="filters">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Toutes categories</option>
            <option value="shoes">Chaussures</option>
            <option value="clothing">Vetements</option>
            <option value="accessories">Accessoires</option>
            <option value="bags">Sacs</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="createdAt">Date</option>
            <option value="price">Prix</option>
            <option value="name">Nom</option>
          </select>
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="asc">Croissant</option>
            <option value="desc">Decroissant</option>
          </select>
        </div>
      </div>

      {loading && products.length === 0 && (
        <p className="loading">Chargement...</p>
      )}
      {error && <p className="error">Erreur : {error}</p>}

      {!error && (
        <>
          {!loading && products.length === 0 ? (
            <p className="empty">Aucun produit trouve.</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          <LoadMore
            loaded={products.length}
            total={pagination?.total ?? 0}
            hasMore={hasMore}
            loadingMore={loadingMore}
            onLoadMore={loadMore}
          />
        </>
      )}
    </div>
  );
}
