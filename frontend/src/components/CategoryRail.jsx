import CategoryCard from "./CategoryCard";

export default function CategoryRail({ categories, selectedCategory, onSelectCategory }) {
  return (
    <aside className="category-rail" aria-label="Filtrer par categorie">
      {categories.map((category) => (
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
    </aside>
  );
}
