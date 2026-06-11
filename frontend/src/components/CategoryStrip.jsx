import CategoryCard from "./CategoryCard";
import { CATEGORY_FILTERS } from "../config/categories";

const ALL_CATEGORIES = [...CATEGORY_FILTERS.left, ...CATEGORY_FILTERS.right];

export default function CategoryStrip({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-strip" aria-label="Filtrer par categorie">
      {ALL_CATEGORIES.map((category) => (
        <CategoryCard
          key={category.value}
          label={category.label}
          image={category.image}
          active={selectedCategory === category.value}
          onClick={() =>
            onSelectCategory(
              selectedCategory === category.value ? "" : category.value
            )
          }
        />
      ))}
    </div>
  );
}
