import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
}

const Card = ({ children, title }: CardProps) => (
  <section className='card'>
    {title && <h2 className='card-title'>{title}</h2>}
    {children}
  </section>
);

export default Card;
