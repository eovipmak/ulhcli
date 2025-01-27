import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { test, expect } from '@jest/globals';

test('renders blog post app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Blog Post App/i);
  expect(titleElement).toBeInTheDocument();
}); 