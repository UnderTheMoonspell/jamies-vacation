import { findByText, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CityItem } from 'components/CityItem/CityItem';
import Config from 'config';
import { City } from 'models/City';
import React from 'react';
import { kiwiAPI } from 'services/api.service';
import { changeInput } from 'services/test.helpers';
import { CustomSearch } from './CustomSearch';

const locationResults = {
  locations: [
    {
      id: 1,
      city: {
        name: 'Lisbon',
      },
    },
    {
      id: 2,
      city: {
        name: 'Lisbotheum',
      },
    },
  ],
};

const clickHandler = jest.fn();

fit('CustomSearch', async () => {
  kiwiAPI.get = jest.fn(() => Promise.resolve(locationResults)) as any;

  render(
    <CustomSearch
      url={Config.endpoints.LOCATIONS}
      renderedItem={(props: City) => <CityItem {...props} />}
      clickHandler={clickHandler}
    />
  );

  const searchInput = screen.getByTestId('search-input') as HTMLInputElement;

  expect(searchInput).toBeInTheDocument();

  changeInput(searchInput, 'Bu');

  await waitFor(() => screen.queryByText('No results found'));
  expect(kiwiAPI.get).not.toHaveBeenCalled();
  expect(screen.getByText('No results found.')).toBeInTheDocument();

  changeInput(searchInput, 'Lisbon');
  await waitFor(() => expect(screen.queryByText('Lisbon')).toBeInTheDocument());
  expect(kiwiAPI.get).toHaveBeenCalledWith(Config.endpoints.LOCATIONS('Lisbon'));

  fireEvent.click(screen.getByText('Lisbon'));

  expect(clickHandler).toHaveBeenCalled();
});
