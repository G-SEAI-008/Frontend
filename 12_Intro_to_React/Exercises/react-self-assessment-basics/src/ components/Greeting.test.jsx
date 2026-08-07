import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Greeting } from '.';

const rendersSomething = (Element) => {
  const { container, unmount } = render(Element);

  if (!container.firstChild) {
    return false;
  }

  unmount();
  return true;
};

describe.runIf(rendersSomething(<Greeting />))('Greeting Component', () => {
  it('Renders in a div', () => {
    const { container } = render(<Greeting name='Ada' />);
    const div = container.firstChild;
    expect(div.tagName).toBe('DIV');
  });

  it('Renders Hello `name`', () => {
    render(<Greeting name='Ada' />);
    const text = screen.getByText('Hello, Ada!');
    expect(text).toBeInTheDocument();
  });

  it('Renders "Hello, stranger!" if no name is provided', () => {
    render(<Greeting />);
    const text = screen.getByText('Hello, stranger!');
    expect(text).toBeInTheDocument();
  });

  it('Renders "Hello, stranger!" if name is empty', () => {
    render(<Greeting name='' />);
    const text = screen.getByText('Hello, stranger!');
    expect(text).toBeInTheDocument();
  });

  it('Renders "Hello???" if name is NOT a string', () => {
    render(<Greeting name={123} />);
    const text = screen.getByText('Hello???');
    expect(text).toBeInTheDocument();
  });
});
