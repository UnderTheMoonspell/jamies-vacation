import { City } from 'models/City';
import { formattedDate } from 'services/utils.service';

const OpenWeatherAPIKeyQS: string = `&APPID=f0e307920b21ae38564d922c31d05753`;

export default class Config {
  static destinations: string[] = ['Amsterdam', 'Madrid', 'Budapest'];

  static weatherBaseUrl: string = `https://api.openweathermap.org/data/2.5`;
  static ticketsBaseUrl: string = `https://api.skypicker.com`;
  static locationsBaseUrl: string = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`;

  static imageMediaServer: string = 'https://media.dazzletag.com/';

  static geoDBAPIKey: string =
    'e4eb504fb1msh555eb5f9d12b8bdp190b61jsn65b06d4870d1';
  static geoDBRapidHpst: string = 'wft-geo-db.p.rapidapi.com';

  static paginationItemsPerPage: number = 12;

  static endpoints = {
    GET_WEATHER_BY_CITY: (city: string) =>
      `/weather?q=${city}${OpenWeatherAPIKeyQS}`,
    LOCATIONS: (term: string) => `?namePrefix=${term}&minPopulation=500000&type=city`,
    GET_TICKET_INFO: (from: string, to: string, dateFrom: string, dateTo: string) => 
      `/flights?cityFrom=${from}&cityTo=${to}&date_from=${dateFrom}&date_to=${dateTo}&partner=picky`,
  };
}
