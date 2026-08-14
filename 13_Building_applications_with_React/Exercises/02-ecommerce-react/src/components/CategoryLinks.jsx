import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { getCategories } from '@/api/fakeStore';

import Alert from './Alert';
import CategoriesSkeleton from './CategoriesSkeleton';

const CategoryLinks = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategories(await getCategories());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return <CategoriesSkeleton />;
  }

  if (categories.length === 0) {
    return <Alert message='No categories found' type='warning' />;
  }

  return categories.map((category) => (
    <Link key={category} to={`/category/${category}`} className='btn btn-outline btn-primary'>
      {category}
    </Link>
  ));
};

export default CategoryLinks;
