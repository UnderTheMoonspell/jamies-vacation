import { render, screen } from '@testing-library/react';
import React from 'react';
import { CityItem } from './CityItem';

const props = {
  name: 'Portela Aiport',
  city: {
    name: 'Lisbon',
    country: {
      code: 'pt',
    },
  },
};

it('Renders CityItem', () => {
  render(<CityItem {...props} />);

  expect(screen.getByText('Portela Aiport')).toBeInTheDocument();
});
