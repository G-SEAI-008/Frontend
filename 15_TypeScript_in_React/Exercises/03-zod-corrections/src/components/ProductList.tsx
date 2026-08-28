import { useEffect, useState } from 'react';
import { z } from 'zod';

import { ProductSchema, ProductsResponseSchema } from '../schemas/products';
import type { Product } from '../types';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        }

        // const d: unknown = await res.json();
        const { products: rawProducts } = ProductsResponseSchema.parse(await res.json());

        // # Methode 1: das gesamte Array prüfen. Wenn ein Element fehlerhaft = gesamtes Array in "error"
        // const { success, data, error } = ProductSchemaArray.safeParse(await res.json());

        // # Methode 2: Elementweise Validierung
        // * Array zum speichern der erfolgreich geprüften einzelnen Elemente (success === true)
        const fetchedProducts = [];
        const productErrors = [];

        // * for-of loop, um durch alle Elemente des Arrays durchzugehen und jedes einzelne Element zu prüfen
        for (const product of rawProducts) {
          const { success, data, error } = ProductSchema.safeParse(product);

          if (success) {
            fetchedProducts.push(data);
          } else {
            productErrors.push(z.prettifyError(error));
          }
        }

        setProducts(fetchedProducts);
        setErrors(productErrors);
      } catch (error) {
        if (error instanceof Error) {
          setErrors([error.message]);
        }
      }
    };

    void fetchData();
  }, []);

  console.log(products);
  console.log(errors);

  return (
    <ul>
      {products?.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
};

export default ProductList;
