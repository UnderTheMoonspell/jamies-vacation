import React from 'react';
import Home from './Home';
import { when } from 'jest-when';
import {
  render,
  waitFor,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { changeInput, selectOption } from 'services/test.helpers';
import Config from 'config';
import { BrowserRouter } from 'react-router-dom';
import { kiwiAPI, weatherAPI } from 'services/api.service';
import { act } from 'react-dom/test-utils';
import moment from 'moment';

const weatherDataAmsterdam = {
  weather: [
    { id: 741, main: 'Fog', description: 'fog', icon: '50n' },
    { id: 701, main: 'Mist', description: 'mist', icon: '50n' },
  ],
  main: {
    temp: 4.65,
    feels_like: 4.65,
    temp_min: 4.44,
    temp_max: 5,
    pressure: 1023,
    humidity: 93,
  },
  name: 'Amsterdam',
};

const weatherDataMadrid = {
  weather: [
    { id: 741, main: 'Fog', description: 'fog', icon: '50n' },
    { id: 701, main: 'Mist', description: 'mist', icon: '50n' },
  ],
  main: {
    temp: 14.76,
    feels_like: 14.76,
    temp_min: 4.44,
    temp_max: 5,
    pressure: 1023,
    humidity: 32,
  },
  name: 'Madrid',
};

const weatherDataBudapest = {
  weather: [
    { id: 741, main: 'Fog', description: 'fog', icon: '50n' },
    { id: 701, main: 'Mist', description: 'mist', icon: '50n' },
  ],
  main: {
    temp: 1.21,
    feels_like: 1.21,
    temp_min: 4.44,
    temp_max: 5,
    pressure: 1023,
    humidity: 77,
  },
  name: 'Budapest',
};

const airportData = {
  locations: [
    {
      id: 1,
      name: 'Portela',
      city: {
        name: 'Lisbon',
      },
      code: 'LIS',
    },
    {
      id: 2,
      name: 'Coisas',
      city: {
        name: 'Lisbonatheum',
      },
      code: 'LIS',
    },
  ],
};

const flightTicketAmsterdamData = {
  data: [
    {
      id: 1,
      flyFrom: 'LIS',
      flyTo: 'AMS',
      price: 80,
    },
  ],
};

const flightTicketMadridData = {
  data: [
    {
      id: 2,
      flyFrom: 'LIS',
      flyTo: 'MAD',
      price: 110,
    },
  ],
};

const flightTicketBudapestData = {
  data: [
    {
      id: 3,
      flyFrom: 'LIS',
      flyTo: 'BUD',
      price: 200,
    },
  ],
};

describe('Home', () => {
  it('Renders the list of results', async () => {
    weatherAPI.get = jest.fn();
    when(weatherAPI.get as any)
      .calledWith(Config.endpoints.GET_WEATHER_BY_CITY('Amsterdam'))
      .mockReturnValue(weatherDataAmsterdam);
    when(weatherAPI.get as any)
      .calledWith(Config.endpoints.GET_WEATHER_BY_CITY('Madrid'))
      .mockReturnValue(weatherDataMadrid);
    when(weatherAPI.get as any)
      .calledWith(Config.endpoints.GET_WEATHER_BY_CITY('Budapest'))
      .mockReturnValue(weatherDataBudapest);

    let container: any;

    await act(async () => {
      container = render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
    });

    expect(screen.getByText('Where are you flying from ?')).toBeInTheDocument();

    kiwiAPI.get = jest.fn();

    when(kiwiAPI.get as any)
      .calledWith(Config.endpoints.LOCATIONS('Lisbon'))
      .mockReturnValue(airportData);

    when(kiwiAPI.get as any)
      .calledWith(
        Config.endpoints.GET_TICKET_INFO(
          'LIS',
          'AMS',
          moment(new Date()).format(Config.dateFormat),
          moment(new Date()).add({ days: 1 }).format(Config.dateFormat)
        )
      )
      .mockReturnValueOnce(flightTicketAmsterdamData);

    when(kiwiAPI.get as any)
      .calledWith(
        Config.endpoints.GET_TICKET_INFO(
          'LIS',
          'MAD',
          moment(new Date()).format(Config.dateFormat),
          moment(new Date()).add({ days: 1 }).format(Config.dateFormat)
        )
      )
      .mockReturnValueOnce(flightTicketMadridData);

    when(kiwiAPI.get as any)
      .calledWith(
        Config.endpoints.GET_TICKET_INFO(
          'LIS',
          'BUD',
          moment(new Date()).format(Config.dateFormat),
          moment(new Date()).add({ days: 1 }).format(Config.dateFormat)
        )
      )
      .mockReturnValueOnce(flightTicketBudapestData);

    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;

    changeInput(searchInput, 'Lisbon');
    await waitFor(() =>
      expect(screen.queryByText('Lisbon')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Lisbon'));

    await waitFor(() =>
      expect(screen.getByText('Amsterdam')).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText('Budapest')).toBeInTheDocument()
    );
    await waitFor(() => expect(screen.getByText('Madrid')).toBeInTheDocument());

    const temperatures = screen.getAllByTestId('temperature');
    const prices = screen.getAllByTestId('price');

    expect(prices[0].textContent).toBe('80€');
    expect(temperatures[0].textContent).toBe('Temperature: 4.7 º');

    expect(prices[2].textContent).toBe('200€');
    expect(temperatures[2].textContent).toBe('Temperature: 1.2 º');

    // SORT

    const sortElm = screen.getByTestId('city-sort') as HTMLElement;

    expect(sortElm).toBeInTheDocument();

    await selectOption(sortElm, 'Weather');

    const sortedTemperatures = screen.getAllByTestId('temperature');
    const sortedPrices = screen.getAllByTestId('price');

    expect(sortedPrices[0].textContent).toBe('110€');
    expect(sortedTemperatures[0].textContent).toBe('Temperature: 14.8 º');

    expect(sortedPrices[2].textContent).toBe('200€');
    expect(sortedTemperatures[2].textContent).toBe('Temperature: 1.2 º');

    // EMPTY VALUES

    when(kiwiAPI.get as any)
      .calledWith(Config.endpoints.LOCATIONS('Lisbonatheum'))
      .mockReturnValue(airportData);

    changeInput(searchInput, 'Lisbonatheum');
    await waitFor(() =>
      expect(screen.queryByText('Lisbonatheum')).toBeInTheDocument()
    );

    when(kiwiAPI.get as any)
      .calledWith(
        Config.endpoints.GET_TICKET_INFO(
          'LIS',
          'AMS',
          moment(new Date()).format(Config.dateFormat),
          moment(new Date()).add({ days: 1 }).format(Config.dateFormat)
        )
      )
      .mockReturnValueOnce({ data: [] });

    when(kiwiAPI.get as any)
      .calledWith(
        Config.endpoints.GET_TICKET_INFO(
          'LIS',
          'MAD',
          moment(new Date()).format(Config.dateFormat),
          moment(new Date()).add({ days: 1 }).format(Config.dateFormat)
        )
      )
      .mockReturnValueOnce({ data: [] });

    when(kiwiAPI.get as any)
      .calledWith(
        Config.endpoints.GET_TICKET_INFO(
          'LIS',
          'BUD',
          moment(new Date()).format(Config.dateFormat),
          moment(new Date()).add({ days: 1 }).format(Config.dateFormat)
        )
      )
      .mockReturnValueOnce({ data: [] });

    fireEvent.click(screen.getByText('Lisbonatheum'));

    await waitFor(() =>
      expect(
        screen.getByText('No flights from the chosen destination')
      ).toBeInTheDocument()
    );
  });
});
