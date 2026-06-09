export default function SkeletonCard() {
  return (
    <div className="product-card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-category" />
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-title short" />
      <div className="skeleton skeleton-price" />
    </div>
  );
}
