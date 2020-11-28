import React from 'react';
import Home from './Home';
import { when } from 'jest-when'
import {
  cleanup,
  render,
  waitFor,
  fireEvent,
  screen,
} from '@testing-library/react';
// import { API } from 'services/api.service';
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
    feels_like: 0.04,
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
    feels_like: 0.04,
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
    feels_like: 0.04,
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
      code: 'LIS'
    },
    {
      id: 2,
      name: 'Coisas',
      city: {
        name: 'Lisbonatheum',
      },
      code: 'LIS'
    },
  ],
};

const flightTicketAmsterdamData = {
  data: [
    {
      id: 1,
      flyFrom: 'LIS',
      flyTo: 'AMS',
      price: 10,
    }
  ]
};

const flightTicketMadridData = {
  data: [
    {
      id: 1,
      flyFrom: 'LIS',
      flyTo: 'MAD',
      price: 10,
    }
  ]
};

const flightTicketBudapestData = {
  data: [
    {
      id: 1,
      flyFrom: 'LIS',
      flyTo: 'BUD',
      price: 10,
    }
  ]
};


describe('Home', () => {
  // afterEach(cleanup);

  fit('Renders Home', async () => {
    weatherAPI.get = jest.fn();

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText('Where are you flying from ?')).toBeInTheDocument();
  });

  it('Renders the list of results', async () => {
    weatherAPI.get = jest.fn();
    when(weatherAPI.get as any).calledWith(Config.endpoints.GET_WEATHER_BY_CITY('Amsterdam')).mockReturnValue(weatherDataAmsterdam)
    when(weatherAPI.get as any).calledWith(Config.endpoints.GET_WEATHER_BY_CITY('Madrid')).mockReturnValue(weatherDataMadrid)
    when(weatherAPI.get as any).calledWith(Config.endpoints.GET_WEATHER_BY_CITY('Budapest')).mockReturnValue(weatherDataBudapest)

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    kiwiAPI.get = jest.fn();

    when(kiwiAPI.get as any).calledWith(Config.endpoints.LOCATIONS('Lisbon')).mockReturnValue(airportData)
    
    when(kiwiAPI.get as any).calledWith(Config.endpoints.GET_TICKET_INFO(
      'LIS',
      'AMS',
      moment(new Date()).format(Config.dateFormat),
      moment(new Date()).add({ days: 1 }).format(Config.dateFormat)
    )).mockReturnValue(flightTicketAmsterdamData)

    when(kiwiAPI.get as any).calledWith(Config.endpoints.GET_TICKET_INFO(
      'LIS',
      'MAD',
      moment(new Date()).format(Config.dateFormat),
      moment(new Date()).add({ days: 1 }).format(Config.dateFormat)
    )).mockReturnValue(flightTicketMadridData)

    when(kiwiAPI.get as any).calledWith(Config.endpoints.GET_TICKET_INFO(
      'LIS',
      'BUD',
      moment(new Date()).format(Config.dateFormat),
      moment(new Date()).add({ days: 1 }).format(Config.dateFormat)
    )).mockReturnValue(flightTicketBudapestData)

    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;

    changeInput(searchInput, 'Lisbon');
    await waitFor(() =>
      expect(screen.queryByText('Lisbon')).toBeInTheDocument()
    );

    // kiwiAPI.get = jest.fn(() => Promise.resolve(flightTicketData)) as any;

    fireEvent.click(screen.getByText('Lisbon'));

    await waitFor(() => expect(screen.getByText('Amsterdam')).toBeInTheDocument());

    // expect(API.get).toHaveBeenCalledWith(
    //   Config.endpoints.GET_NEWS({ page: 1 })
    // );
    // expect(screen.getByText('News 2')).toBeInTheDocument();
    // expect(screen.getByText('News 2 description')).toBeInTheDocument();

    // const paginationElm = container.querySelector('.pagination') as HTMLElement;

    // expect(paginationElm.childElementCount).toBe(7);
  });

  // it('Changes news page and sort', async () => {
  //   API.get = jest.fn().mockResolvedValueOnce(newsPage1);

  //   const { container } = render(
  //     <BrowserRouter>
  //       <Home />
  //     </BrowserRouter>
  //   );

  //   await waitFor(() => expect(screen.getByText('News 1')).toBeInTheDocument());

  //   const sortElm: HTMLElement = screen.getByTestId('news-sort');

  //   expect(sortElm).toBeInTheDocument();

  //   const paginationElm: HTMLElement = container.querySelector(
  //     '.pagination'
  //   ) as HTMLElement;

  //   const secondPageButton = paginationElm.children[3];

  //   API.get = jest.fn().mockResolvedValueOnce(newsPage2);

  //   fireEvent.click(secondPageButton);

  //   expect(API.get).toHaveBeenCalledWith(
  //     Config.endpoints.GET_NEWS({ page: 2 })
  //   );

  //   await waitFor(() =>
  //     expect(screen.queryByText('News 13')).toBeInTheDocument()
  //   );

  //   expect(screen.queryByText('News 2')).not.toBeInTheDocument();
  //   expect(screen.queryByText('News 14 description')).toBeInTheDocument();

  //   await selectOption(sortElm, 'Start Date');

  //   expect(
  //     container
  //       .querySelector('.news-container')
  //       ?.children[0].querySelector('.header')?.innerHTML
  //   ).toBe('News 14');

  //   await selectOption(sortElm, 'Id');

  //   expect(
  //     container
  //       .querySelector('.news-container')
  //       ?.children[0].querySelector('.header')?.innerHTML
  //   ).toBe('News 14');
  // });
});
