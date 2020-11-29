import Config from 'config';
import orderBy from 'lodash.orderby';
import { City } from 'models/City';
import { Weather } from 'models/Weather';
import { useEffect, useState } from 'react';
import { kiwiAPI, weatherAPI } from 'services/api.service';
import moment from 'moment';

export type CityHook = {
  cities: City[];
  isLoading: boolean;
  finishedFetching: boolean;
  sortCities: (field: string, direction: string) => void;
};

export const useCity = (selectedCity: any) => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [finishedFetching, setFinishedFetching] = useState<boolean>(false);

  const sortCities = (field: string, direction: string) =>
    setCities(
      orderBy(
        cities,
        field.split(','),
        direction.split(',') as ('asc' | 'desc')[]
      )
    );

  const getCityWeather = async (destination: any) => {
    //TODO rework apiHook to accept consecutive updates
    let cityWeather = await weatherAPI.get(
      Config.endpoints.GET_WEATHER_BY_CITY(destination.name) //TODO Types for destination cities
    );
    setCities((cities) => [
      ...cities,
      {
        ...destination,
        feels_like: cityWeather.main.feels_like,
        weather: {
          icon: cityWeather.weather[0].icon,
          humidity: cityWeather.main.humidity,
          temp: cityWeather.main.temp.toFixed(1),
        } as Weather,
      } as City,
    ]);
  };

  useEffect(() => {
    const getDestinationsWeather = async () =>
      await Promise.all(Config.destinations.map(getCityWeather));

    getDestinationsWeather();
  }, []);

  useEffect(() => {
    const getPriceInfo = async (destination: any) => {
      setFinishedFetching(false);
      const ticketInfo = await kiwiAPI.get(
        Config.endpoints.GET_TICKET_INFO(
          selectedCity.code,
          destination.code,
          moment(new Date()).format(Config.dateFormat),
          moment(new Date()).add({ days: 1 }).format(Config.dateFormat)
        ) //TODO add date as inputs
      );
      ticketInfo.data.length &&
        setCities((cities) => {
          //TODO this could be normalized, the property access would be much more immediate
          const newState = cities.map((city) => {
            if (city.name === destination.name) {
              return {
                ...city,
                price: ticketInfo.data[0].price,
              };
            } else {
              return city;
            }
          });
          return orderBy(newState, 'price', 'asc');
        });
      setFinishedFetching(true);
    };

    const getDestinationsPrices = async () => {
      setCities(prevCities => prevCities.map(city => ({...city, price: 0})))
      setIsLoading(true);
      await Promise.all(Config.destinations.map(getPriceInfo));
      setIsLoading(false);
    };

    selectedCity?.name && getDestinationsPrices();
  }, [selectedCity]);

  return {
    cities,
    isLoading,
    sortCities,
    finishedFetching,
  } as CityHook;
};
