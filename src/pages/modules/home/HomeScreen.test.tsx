import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeScreen from './HomeScreen';

test('renders HomeScreen component correctly', () => {
  render(<HomeScreen />);

  const divElement = screen.getByTestId('home-screen');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveClass('bg-light');

  const buttonElement = screen.getByRole('button', { name: /home/i });
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass('btn-neutral');
});
