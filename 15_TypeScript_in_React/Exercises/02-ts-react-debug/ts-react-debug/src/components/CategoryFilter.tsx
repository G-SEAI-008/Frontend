import type { Filter } from '../types';

const options: Filter[] = ['all', 'music', 'sports', 'tech', 'food'];

interface CategoryFilterProps {
  value: Filter;
  onChange: (filter: Filter) => void;
}

const CategoryFilter = ({ value, onChange }: CategoryFilterProps) => (
  <div className='filters'>
    {options.map((option) => (
      <button
        key={option}
        type='button'
        className={option === value ? 'active filter' : 'filter'}
        onClick={() => {
          onChange(option);
        }}
      >
        {option}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
