import React from 'react';
import { render, screen } from '@testing-library/react';
import Booking from '../components/Booking';
import '@testing-library/jest-dom'

test('renders Booking component', () => {
  render(<Booking />);
  
  const titleElement = screen.getByText('Booking Calendar');
  const sliderElement = screen.getByLabelText('2 Hours');
  const subTitle = screen.getByText('Use the slider to estimate how long your session will be');
  const tableTitle = screen.getByText('Select the slots you want to book');
  
  expect(titleElement).toBeInTheDocument();
  expect(sliderElement).toBeInTheDocument();
  expect(subTitle).toBeInTheDocument();
  expect(tableTitle).toBeInTheDocument();
});
