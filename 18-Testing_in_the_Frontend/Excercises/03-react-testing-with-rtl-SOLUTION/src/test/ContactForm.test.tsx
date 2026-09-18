// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für diese Lernbeispiele.
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import ContactForm from '../components/ContactForm';

describe('contactForm', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('zeigt die beschrifteten Felder und einen aktiven Senden-Button', () => {
    render(<ContactForm />);

    expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument();
    expect(screen.getByLabelText('Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByLabelText('Message *')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeEnabled();
  });

  test('zeigt die Pflichtfeldfehler bei einem leeren Formular', async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    const nameError = await screen.findByText('Name is required');

    expect(nameError).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  test('lehnt eine ungültige E-Mail-Adresse ab', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText('Email *'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    const emailError = await screen.findByText('Email is invalid');

    expect(emailError).toBeInTheDocument();
  });

  test('sperrt den Button während des Sendens und zeigt danach den Erfolg', async () => {
    // Das Formular simuliert zwei Sekunden Wartezeit. Die Testuhr überspringt sie.
    vi.useFakeTimers();
    vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText('Message *'), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(screen.getByRole('button', { name: 'Send Message' })).toBeDisabled();

    // act sorgt dafür, dass React die durch den Timer ausgelösten Updates verarbeitet.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(screen.getByText('Thank you for your message!')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Send Message' })).not.toBeInTheDocument();
  });
});
