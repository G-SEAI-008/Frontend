// oxlint-disable vitest/prefer-expect-assertions
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Counter } from '@/components';

describe('counter Component', () => {
  describe('initial Rendering', () => {
    test('renders with default initial value of 0', () => {
      render(<Counter />);
      expect(screen.getByRole('heading', { name: /counter component/iu })).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('renders with custom initial value', () => {
      render(<Counter initialValue={5} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    test('renders all buttons', () => {
      render(<Counter />);
      expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /reset/iu })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    });
  });

  describe('button functionality', () => {
    test('increments counter when + button is clicked', () => {
      // Arrange => Vorbereiten: Komponente rendern und benötigte Elemente finden
      render(<Counter />);
      const incrementBtn = screen.getByRole('button', { name: '+' });
      // Act => Handeln: die Benutzeraktion ausführen
      fireEvent.click(incrementBtn);
      fireEvent.click(incrementBtn);
      // Assert => Prüfen: kontrollieren, was der Benutzer sehen würde
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('decements counter when - button is clicked', () => {
      // Arrange
      render(<Counter initialValue={5} />);
      const decrementBtn = screen.getByRole('button', { name: '-' });
      // Act
      fireEvent.click(decrementBtn);
      fireEvent.click(decrementBtn);
      // Assert
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    test('resets counter to initial value when reset button is clicked', () => {
      // Arrange
      render(<Counter />);
      const incrementBtn = screen.getByRole('button', { name: '+' });
      const resetBtn = screen.getByRole('button', { name: /reset/iu });
      // Act
      fireEvent.click(incrementBtn);
      fireEvent.click(resetBtn);
      // Assert
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('button states', () => {
    test('disables decrement button when counter is at 0', () => {
      // Arrange
      render(<Counter initialValue={0} />);
      const decrementBtn = screen.getByRole('button', { name: '-' });
      // Assert
      expect(decrementBtn).toBeDisabled();
    });

    test('disables decrement button when counter reaches 0 after decrementing', () => {
      // Arrange
      render(<Counter initialValue={1} />);
      const decrementBtn = screen.getByRole('button', { name: '-' });
      // Act
      fireEvent.click(decrementBtn);
      // Assert
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(decrementBtn).toBeDisabled();
    });

    test('enables decrement button when counter is above 0', () => {
      // Arrange
      render(<Counter initialValue={5} />);
      const decrementBtn = screen.getByRole('button', { name: '-' });
      // Assert
      expect(decrementBtn).not.toBeDisabled();
    });

    test('enables decrement button when counter goes above 0 after incrementing', () => {
      // Arrange
      render(<Counter initialValue={0} />);
      const incrementBtn = screen.getByRole('button', { name: '+' });
      const decrementBtn = screen.getByRole('button', { name: '-' });
      // Act
      fireEvent.click(incrementBtn);
      // Assert
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(decrementBtn).not.toBeDisabled();
    });
  });

  describe('conditional Messages', () => {
    test('shows zero message when counter is at 0', () => {
      // Arrange
      render(<Counter initialValue={0} />);
      // Assert
      expect(screen.getByText('Counter is at zero!')).toBeInTheDocument();
    });

    test('hides zero message when counter is not at 0', () => {
      // Arrange
      render(<Counter initialValue={1} />);
      // Assert
      expect(screen.queryByText('Counter is at zero!')).not.toBeInTheDocument();
    });

    test('shows zero message when counter reaches 0 after decrementing', () => {
      // Arrange
      render(<Counter initialValue={1} />);
      const decrementBtn = screen.getByRole('button', { name: '-' });
      // Act
      fireEvent.click(decrementBtn);
      // Assert
      expect(screen.getByText('Counter is at zero!')).toBeInTheDocument();
    });

    test('hides zero message when counter leaves 0', () => {
      // Arrange
      render(<Counter initialValue={0} />);
      const incrementBtn = screen.getByRole('button', { name: '+' });
      // Act
      fireEvent.click(incrementBtn);
      // Assert
      expect(screen.queryByText('Counter is at zero!')).not.toBeInTheDocument();
    });

    test('shows milestone message when counter reaches 10', () => {
      // Arrange
      render(<Counter initialValue={9} />);
      const incrementBtn = screen.getByRole('button', { name: '+' });
      // Act
      fireEvent.click(incrementBtn);
      // Assert
      expect(screen.getByText("Great! You've reached 10!")).toBeInTheDocument();
    });

    test('shows milestone message when counter is above 10', () => {
      // Arrange
      render(<Counter initialValue={15} />);
      // Assert
      expect(screen.getByText("Great! You've reached 15!")).toBeInTheDocument();
    });

    test('hides milestone message when counter goes below 10', () => {
      // Arrange
      render(<Counter initialValue={10} />);
      const decrementBtn = screen.getByRole('button', { name: '-' });
      // Act
      fireEvent.click(decrementBtn);
      // Assert
      expect(screen.queryByText(/great! you've reached/iu)).not.toBeInTheDocument();
    });

    test('updates milestone message text as counter value changes', () => {
      // Arrange
      render(<Counter initialValue={10} />);
      const incrementBtn = screen.getByRole('button', { name: '+' });
      // Act
      fireEvent.click(incrementBtn);
      // Assert
      expect(screen.getByText("Great! You've reached 11!")).toBeInTheDocument();
    });
  });
});
