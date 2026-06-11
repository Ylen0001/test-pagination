import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import ProductCard from "./components/ProductCard";
import SkeletonCard from "./components/SkeletonCard";
import LoadMore from "./components/LoadMore";
import EmptyState from "./components/EmptyState";
import ErrorState from "./components/ErrorState";
import Footer from "./components/Footer";
import CategoryRail from "./components/CategoryRail";
import CategoryStrip from "./components/CategoryStrip";
import SortControls from "./components/SortControls";
import SideNav from "./components/SideNav";
import { CATEGORY_FILTERS } from "./config/categories";

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
    loadMoreError,
    hasMore,
    loadMore,
    retry,
  } = useProducts({ limit, category, sort, order });

  const showInitialError = error && products.length === 0 && !loading;
  const catalogViewKey = `${category}|${sort}|${order}`;

  return (
    <div className="page-shell">
      <SideNav />
      <CategoryStrip
        selectedCategory={category}
        onSelectCategory={setCategory}
      />
      <div className="catalog-layout">
        <CategoryRail
          categories={CATEGORY_FILTERS.left}
          selectedCategory={category}
          onSelectCategory={setCategory}
        />

        <div className="app">
        <header className="header">
          <div className="header-title">
            <h1>Catalogue</h1>
            <p className="subtitle">Decouvrez notre selection</p>
          </div>

          <SortControls
            sort={sort}
            order={order}
            onSortChange={setSort}
            onOrderChange={setOrder}
          />
        </header>

        {showInitialError ? (
          <ErrorState message={error} onRetry={retry} retrying={loading} />
        ) : (
          <div className="catalog-body">
            <div className="catalog-scroll">
              <div key={catalogViewKey} className="catalog-view">
                {loading && products.length === 0 ? (
                  <div className="product-grid">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                ) : !loading && products.length === 0 ? (
                  <EmptyState hasCategoryFilter={Boolean(category)} />
                ) : (
                  <div className="product-grid">
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <LoadMore
              loaded={products.length}
              total={pagination?.total ?? 0}
              hasMore={hasMore}
              loadingMore={loadingMore}
              loadMoreError={loadMoreError}
              onLoadMore={loadMore}
              onRetry={retry}
            />
          </div>
        )}
        </div>

        <CategoryRail
          categories={CATEGORY_FILTERS.right}
          selectedCategory={category}
          onSelectCategory={setCategory}
        />
      </div>
      <Footer />
    </div>
  );
}
