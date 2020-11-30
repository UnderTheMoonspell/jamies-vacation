import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { AirportItem } from 'components/AirportItem/AirportItem';
import Config from 'config';
import { Airport } from 'models/Airport';
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
        name: 'Lisbonatheum',
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
      renderedItem={(props: Airport) => <AirportItem {...props} />}
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
  expect(kiwiAPI.get).toHaveBeenCalledWith(
    Config.endpoints.LOCATIONS('Lisbon')
  );

  const resultContainer = screen.getByTestId(
    'results-container'
  ) as HTMLElement;

  expect(resultContainer.childElementCount).toBe(2);
  fireEvent.click(screen.getByText('Lisbon'));

  expect(clickHandler).toHaveBeenCalled();
});
