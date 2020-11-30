const OpenWeatherAPIKeyQS: string = `&appid=f0e307920b21ae38564d922c31d05753`;

export default class Config {
  static destinations: any[] = [
    {
      id: 1,
      name: 'Amsterdam',
      code: 'AMS',
    },
    {
      id: 2,
      name: 'Madrid',
      code: 'MAD',
    },
    {
      id: 3,
      name: 'Budapest',
      code: 'BUD',
    },
  ];

  static weatherBaseUrl: string = `https://api.openweathermap.org/data/2.5`;
  static kiwiBaseURL: string = `https://api.skypicker.com`;

  static dateFormat = 'DD/MM/yyyy';

  static endpoints = {
    GET_WEATHER_BY_CITY: (city: string) =>
      `/weather?q=${city}${OpenWeatherAPIKeyQS}&units=metric`,
    LOCATIONS: (term: string) =>
      `/locations?term=${term}&location_types=airport&sort=name`,
    //TODO In a production app I would show flights with stopovers, it would mean having pagination or infinite scroll
    GET_TICKET_INFO: (
      from: string,
      to: string,
      dateFrom: string,
      dateTo: string
    ) =>
      `/flights?flyFrom=${from}&to=${to}&date_from=${dateFrom}&date_to=${dateTo}&curr=EURmax_stopovers=0&sort=price&limit=1&partner=picky`,
  };
}
