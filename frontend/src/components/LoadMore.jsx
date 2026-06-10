export default function LoadMore({
  loaded,
  total,
  hasMore,
  loadingMore,
  loadMoreError,
  onLoadMore,
  onRetry,
}) {
  if (total === 0) return null;

  return (
    <div className="pagination">
      {hasMore && (
        <button type="button" onClick={onLoadMore} disabled={loadingMore}>
          {loadingMore ? "Chargement..." : "Charger plus"}
        </button>
      )}

      {!hasMore && loaded > 0 && (
        <p className="end-message">Tous les produits sont affiches</p>
      )}

      {loadMoreError && (
        <div className="inline-error">
          <p>{loadMoreError}</p>
          <button type="button" className="status-action" onClick={onRetry} disabled={loadingMore}>
            Reessayer
          </button>
        </div>
      )}

      <span className="page-info">
        {loaded} sur {total} produits
      </span>
    </div>
  );
}
