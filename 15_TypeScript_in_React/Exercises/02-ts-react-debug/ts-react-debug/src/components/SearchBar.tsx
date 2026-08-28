import { useRef } from 'react';
import type { ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className='search-bar'>
      <input
        ref={inputRef}
        type='search'
        placeholder='Search events'
        value={value}
        onChange={handleChange}
      />
      <button type='button' onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
