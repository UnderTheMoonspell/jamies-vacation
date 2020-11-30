import { render, screen } from '@testing-library/react';
import React from 'react';
import { AirportItem } from './AirportItem';

const props = {
  id: 1,
  name: 'Portela Aiport',
  code: 'LIS',
  city: {
    name: 'Lisbon',
    country: {
      code: 'pt',
    },
  },
};

it('Renders CityItem', () => {
  render(<AirportItem {...props} />);

  expect(screen.getByText('Portela Aiport')).toBeInTheDocument();
});
