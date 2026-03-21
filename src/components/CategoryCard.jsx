import CategoryCardItem from "./CategoryCardItem";

const CategoryCard = ({ categories, onUpdatePrice }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 shadow-sm mb-5">
      {categories.map((category) => (
        <CategoryCardItem
          key={category.id}
          category={category}
          onUpdatePrice={onUpdatePrice}
        />
      ))}
    </div>
  );
};


export default CategoryCard;
