export default function EmptyState({ hasCategoryFilter }) {
  return (
    <div className="status-panel empty-state">
      <p className="status-title">Aucun produit trouve</p>
      <p className="status-message">
        {hasCategoryFilter
          ? "Aucun article ne correspond a cette categorie. Essayez un autre filtre."
          : "Le catalogue est vide pour le moment."}
      </p>
    </div>
  );
}
