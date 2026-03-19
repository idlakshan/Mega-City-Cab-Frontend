import CategoryCardItem from "./CategoryCardItem";
import PropTypes from "prop-types";

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

CategoryCard.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ).isRequired,
  onUpdatePrice: PropTypes.func.isRequired,
};

export default CategoryCard;
