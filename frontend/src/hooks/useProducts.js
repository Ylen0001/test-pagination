import { useState, useEffect, useRef, useCallback } from "react";
import { fetchProducts } from "../api/products";

export function useProducts({ limit, category, sort, order }) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const filterKey = `${category}|${sort}|${order}`;
  const lastFilterKey = useRef(filterKey);

  useEffect(() => {
    let cancelled = false;
    const filtersChanged = lastFilterKey.current !== filterKey;

    if (filtersChanged) {
      lastFilterKey.current = filterKey;
      setProducts([]);
      setPagination(null);
      if (page !== 1) {
        setPage(1);
        return;
      }
    }

    if (page === 1) {
      setLoading(true);
      setLoadingMore(false);
    } else {
      setLoadingMore(true);
    }

    setError(null);

    fetchProducts({ page, limit, category, sort, order })
      .then((data) => {
        if (cancelled) return;
        setPagination(data.pagination);
        setProducts((prev) =>
          page === 1 ? data.data : [...prev, ...data.data]
        );
      })
      .catch((err) => {
        if (cancelled) return;
        if (page === 1) {
          setProducts([]);
          setPagination(null);
        }
        setError(err.message);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
          setLoadingMore(false);
        }
      });

    return () => {
      cancelled = true;
      setLoading(false);
      setLoadingMore(false);
    };
  }, [page, filterKey, limit, category, sort, order]);

  const hasMore = pagination ? products.length < pagination.total : false;

  const loadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) return;
    setPage((current) => current + 1);
  }, [loading, loadingMore, hasMore]);

  return { products, pagination, loading, loadingMore, error, hasMore, loadMore };
}
