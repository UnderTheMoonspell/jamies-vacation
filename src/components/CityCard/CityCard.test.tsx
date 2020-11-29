import { render, screen } from '@testing-library/react';
import { City } from 'models/City';
import React from 'react';
import { CityCard } from './CityCard';

const city = {
  id: 1,
  name: 'Madrid',
  price: 100,
} as City;

it('Renders cityCard', () => {
  render(<CityCard city={city} is_best={true} />);

  expect(screen.getByText(city.name)).toBeInTheDocument();
  expect(screen.getByText('Best')).toBeInTheDocument();
});
