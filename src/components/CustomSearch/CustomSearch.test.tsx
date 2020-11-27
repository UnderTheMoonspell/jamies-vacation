import { render, screen, waitFor } from '@testing-library/react';
import { Game } from 'components/CityItem/CityItem';
import Config from 'config';
import { GameModel } from 'models/Game';
import React from 'react';
import { API } from 'services/api.service';
import { changeInput } from 'services/test.helpers';
import { CustomSearch } from './CustomSearch';

const gameResults = {
  data: [
    {
      id: 1,
      name: 'Kings of cash',
    },
    {
      id: 2,
      name: 'Vikings',
    }
  ],
};

it('CustomSearch', async () => {
  API.get = jest.fn(() => Promise.resolve(gameResults)) as any;

  render(
    <CustomSearch
      url={Config.endpoints.CASINO_GAMES_SEARCH}
      renderedItem={(props: GameModel) => <Game {...props} />}
    />
  );

  const searchInput = screen.getByTestId('search-input') as HTMLInputElement;

  expect(searchInput).toBeInTheDocument();

  changeInput(searchInput, 'a');

  await waitFor(() => screen.queryByText('No results found'));

  expect(screen.getByText('No results found.')).toBeInTheDocument();

  changeInput(searchInput, 'kin');

  await waitFor(() =>
    expect(screen.queryByText('Kings of cash')).toBeInTheDocument()
  );
  expect(API.get).toHaveBeenCalledWith(
    Config.endpoints.CASINO_GAMES_SEARCH(100, 'kin')
  );
});
