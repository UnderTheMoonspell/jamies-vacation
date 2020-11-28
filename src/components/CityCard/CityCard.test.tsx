import { render } from '@testing-library/react';
import { City } from 'models/City';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CityCard } from './CityCard';

const city = {
  id: 1,
  name: 'Madrid',
  price: 100
} as City;

it('Renders cityCard', () => {
  const { getByText } = render(
    <MemoryRouter>
      <CityCard city={city}  is_best={true}/>
    </MemoryRouter>
  );

  expect(getByText(city.name)).toBeInTheDocument();
  expect(getByText("Best")).toBeInTheDocument();
});
