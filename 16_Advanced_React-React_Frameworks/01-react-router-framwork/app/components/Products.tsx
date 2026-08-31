type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductsProps = {
  products: Product[];
};

const Products = ({ products }: ProductsProps) => {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.title} - {p.price}
        </li>
      ))}
    </ul>
  );
};

export default Products;

export type { Product };
