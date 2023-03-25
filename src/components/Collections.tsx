import { useEffect, useState } from 'react';
import { getCategories } from '../helpers/apiCalls';
import { Category } from '../helpers/types';
import { CategoryCard } from './CategoryCard';

export function Collections() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

  return (
    <section id='collections'>
      <h2 className='text-4xl font-semibold text-center mt-12 mb-4 md:text-left md:ml-24'>
        Explore Collections
      </h2>
      <div className='flex flex-wrap justify-center'>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
