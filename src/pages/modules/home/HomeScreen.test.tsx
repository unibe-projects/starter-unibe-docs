// HomeScreen.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeScreen from './HomeScreen';

// Mock de useNavigate de react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

test('renders HomeScreen component correctly', () => {
  render(<HomeScreen />);

  const divElement = screen.getByTestId('home-screen');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveClass('bg-light');

  const buttonElement = screen.getByRole('button', { name: /home/i });
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass('btn-neutral');
});
