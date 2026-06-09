import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import ProductCard from "./components/ProductCard";
import SkeletonCard from "./components/SkeletonCard";
import LoadMore from "./components/LoadMore";

export default function App() {
  const [limit] = useState(12);
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
      <header className="header">
        <div className="header-title">
          <h1>Catalogue</h1>
          <p className="subtitle">Decouvrez notre selection</p>
        </div>

        <div className="filters-panel">
          <div className="filter-group">
            <label htmlFor="filter-category">Categorie</label>
            <select
              id="filter-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Toutes</option>
              <option value="shoes">Chaussures</option>
              <option value="clothing">Vetements</option>
              <option value="accessories">Accessoires</option>
              <option value="bags">Sacs</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filter-sort">Trier par</label>
            <select
              id="filter-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="createdAt">Date</option>
              <option value="price">Prix</option>
              <option value="name">Nom</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filter-order">Ordre</label>
            <select
              id="filter-order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="asc">Croissant</option>
              <option value="desc">Decroissant</option>
            </select>
          </div>
        </div>
      </header>

      {error && <p className="error">Erreur : {error}</p>}

      {!error && (
        <>
          {loading && products.length === 0 ? (
            <div className="product-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : !loading && products.length === 0 ? (
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
