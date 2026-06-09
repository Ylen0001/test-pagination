import { useState, useEffect } from "react";
import { fetchProducts } from "../api/products";

export function useProducts({ page, limit, category, sort, order }) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchProducts({ page, limit, category, sort, order })
      .then((data) => {
        if (cancelled) return;
        setProducts(data.data);
        setPagination(data.pagination);
      })
      .catch((err) => {
        if (cancelled) return;
        setProducts([]);
        setPagination(null);
        setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, limit, category, sort, order]);

  return { products, pagination, loading, error };
}
