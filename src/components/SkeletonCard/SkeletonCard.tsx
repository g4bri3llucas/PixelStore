import "./SkeletonCard.css";

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-card__image skeleton" />
    <div className="skeleton-card__body">
      <div className="skeleton skeleton-card__line" />
      <div className="skeleton-card__title" />
      <div className="skeleton skeleton-card__line skeleton-card__line--short" />
    </div>
    <div className="skeleton-card__footer">
      <div className="skeleton skeleton-card__price" />
      <div className="skeleton skeleton-card__btn" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 8 }: { count?: number }) => (
  <div className="games-grid">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;