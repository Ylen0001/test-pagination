const SORT_OPTIONS = [
  { value: "createdAt", label: "Date" },
  { value: "price", label: "Prix" },
  { value: "name", label: "Nom" },
];

const ORDER_OPTIONS = [
  { value: "asc", label: "Croissant" },
  { value: "desc", label: "Decroissant" },
];

export default function SortControls({ sort, order, onSortChange, onOrderChange }) {
  return (
    <div className="sort-controls">
      <div className="sort-controls__group">
        <span className="sort-controls__label">Ordre</span>
        <div className="segmented-control" role="group" aria-label="Ordre">
          {ORDER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`segmented-control__option${
                order === option.value ? " segmented-control__option--active" : ""
              }`}
              aria-pressed={order === option.value}
              onClick={() => onOrderChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="sort-controls__group">
        <span className="sort-controls__label">Trier par</span>
        <div className="pill-group" role="group" aria-label="Trier par">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`pill${sort === option.value ? " pill--active" : ""}`}
              aria-pressed={sort === option.value}
              onClick={() => onSortChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
