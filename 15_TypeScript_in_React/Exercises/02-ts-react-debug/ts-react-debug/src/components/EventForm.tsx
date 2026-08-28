import { useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';

import type { Category, FormState, NewEvent } from '../types';

const categories: Category[] = ['music', 'sports', 'tech', 'food'];

const emptyForm: FormState = {
  title: '',
  description: '',
  date: '',
  location: '',
  category: 'music',
  price: '0',
};

type EventFormProps = {
  onCreate: (newEvent: NewEvent) => void;
};

const EventForm = ({ onCreate }: EventFormProps) => {
  const [form, setForm] = useState(emptyForm);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, title: e.target.value });
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, date: e.target.value });
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, price: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, description: e.target.value });
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate({
      title: form.title,
      description: form.description,
      date: form.date,
      location: form.location,
      category: form.category,
      price: Number(form.price),
      imageUrl: `https://picsum.photos/seed/${form.title.length + 7}/400/240`,
      soldOut: false,
    });
    setForm(emptyForm);
  };

  return (
    <form className='event-form' onSubmit={handleSubmit}>
      <label>
        Title
        <input required value={form.title} onChange={handleTitleChange} />
      </label>
      <label>
        Location
        <input
          required
          value={form.location}
          onChange={(e) => {
            setForm({ ...form, location: e.target.value });
          }}
        />
      </label>
      <label>
        Date
        <input required type='date' value={form.date} onChange={handleDateChange} />
      </label>
      <label>
        Price in euros
        <input required type='number' min='0' value={form.price} onChange={handlePriceChange} />
      </label>
      <label>
        Description
        <textarea required value={form.description} onChange={handleDescriptionChange} />
      </label>
      <div className='filters'>
        {categories.map((category) => (
          <button
            key={category}
            type='button'
            className={form.category === category ? 'active filter' : 'filter'}
            onClick={() => {
              setForm({ ...form, category });
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <button type='submit'>Add event</button>
    </form>
  );
};

export default EventForm;
