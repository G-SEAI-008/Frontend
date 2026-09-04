import { addProduct } from '../actions/products';

const Product = () => {
  return (
    <div>
      <h2>Add Product</h2>
      <form action={addProduct}>
        <input name='title' placeholder='Product title' className='border' />
        <input name='price' placeholder='Price' className='border' />
        <button type='submit' className='cursor-pointer rounded border'>
          Add Product
        </button>
      </form>
    </div>
  );
};
export default Product;
