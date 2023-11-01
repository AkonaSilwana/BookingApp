import React from 'react';
import { render, screen } from '@testing-library/react';
import Welcome from '../components/Welcome';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

test('renders Welcome component', () => {
    render(
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      );
  const headingElement = screen.getByText('WELCOME TO OUR BOOKING SYSTEM');
  const linkElement = screen.getByText('Start Booking');
  expect(headingElement).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
});
