import { formattedDate } from 'services/utils.service';

const OpenWeatherAPIKeyQS: string = `&appid=f0e307920b21ae38564d922c31d05753`;

export default class Config {
  static destinations: any[] = [
    {
      name: 'Amsterdam',
      code: 'AMS',
    },
    {
      name: 'Madrid',
      code: 'MAD',
    },
    {
      name: 'Budapest',
      code: 'BUD',
    },
  ];

  static weatherBaseUrl: string = `https://api.openweathermap.org/data/2.5`;
  static kiwiBaseURL: string = `https://api.skypicker.com`;

  static imageMediaServer: string = 'https://media.dazzletag.com/';

  static geoDBAPIKey: string =
    'e4eb504fb1msh555eb5f9d12b8bdp190b61jsn65b06d4870d1';
  static geoDBRapidHpst: string = 'wft-geo-db.p.rapidapi.com';

  static paginationItemsPerPage: number = 12;

  static endpoints = {
    GET_WEATHER_BY_CITY: (city: string) =>
      `/weather?q=${city}${OpenWeatherAPIKeyQS}&units=metric`,
    LOCATIONS: (term: string) =>
      `/locations?term=${term}&location_types=airport&sort=name`,
    GET_TICKET_INFO: (
      from: string,
      to: string,
      dateFrom: string,
      dateTo: string
    ) =>
      `/flights?flyFrom=${from}&to=${to}&date_from=${dateFrom}&date_to=${dateTo}&curr=EURmax_stopovers=0&sort=price&limit=1&partner=picky`,
  };
}
