import Alert from "./Alert";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductGrid = ({ loading, products, skeletonCount }) => {
  if (loading) {
    return Array.from({ length: skeletonCount }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ));
  }

  if (products.length === 0) {
    return <Alert message="No products were found" type="warning" />;
  }

  return products.map((product) => <ProductCard key={product.id} product={product} />);
};

export default ProductGrid;
