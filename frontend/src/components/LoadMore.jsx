export default function LoadMore({ loaded, total, hasMore, loadingMore, onLoadMore }) {
  if (total === 0) return null;

  return (
    <div className="pagination">
      {hasMore && (
        <button type="button" onClick={onLoadMore} disabled={loadingMore}>
          {loadingMore ? "Chargement..." : "Charger plus"}
        </button>
      )}
      <span className="page-info">
        {loaded} sur {total} produits
      </span>
    </div>
  );
}
