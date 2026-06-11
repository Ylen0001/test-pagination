export default function CategoryCard({ label, image, active, onClick }) {
  return (
    <button
      type="button"
      className={`category-card${active ? " category-card--active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <img className="category-card__image" src={image} alt="" loading="lazy" />
      <span className="category-card__overlay" aria-hidden="true" />
      <span className="category-card__label">{label}</span>
    </button>
  );
}
