import Config from 'config';
import { City } from 'models/City';
import { useEffect, useRef, useState } from 'react';
import { ticketsAPI, weatherAPI } from 'services/api.service';
import { useAPI } from './api.hook';
import { useEffectSkipFirstRun } from './use-effect-skip-first.hook';

export type CityHook = {
  cities: City[];
  isLoading: boolean;
};

export const useCity = (selectedCity: any) => {
  const [cities, setCities] = useState<City[]>([]);
  // const { isLoading, result, setUrl } = useAPI(ticketsAPI);

  useEffect(() => {
    const getDestinationsWeather = async () =>
      await Promise.all(
        Config.destinations.map(async (city) => {
          //rework apiHook to accept consecutive updates
          let cityWeather = await weatherAPI.get(
            Config.endpoints.GET_WEATHER_BY_CITY(city)
          );
          setCities((cities) => [
            ...cities,
            { name: cityWeather.name, weather: cityWeather.weather },
          ]);
        })
      );

    getDestinationsWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    debugger;
    const getDestinationsPrices = async () =>
      await Promise.all(
        Config.destinations.map(async (city) => {
          let ticketInfo = await ticketsAPI.get(
            Config.endpoints.GET_TICKET_INFO(selectedCity.name, city, '23%2F12%2F2020', '30%2F04%2F2020')
          );
          setCities((cities) => {
            //TODO optimization
            const newStates = cities.map((city) => {
              if (city === selectedCity.name) {
                return { ...city, ticket_price: ticketInfo.price };
              } else {
                return city;
              }
            });
            return newStates;
            // [...cities, { name: cityWeather.name, weather: cityWeather.weather}]
          });
        })
      );

    selectedCity?.name && getDestinationsPrices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  // useEffectSkipFirstRun(() => {
  //   debugger
  //   result && setCities(cities => [...cities, { name: result.name, weather: result.weather}])
  // }, [result])

  return {
    cities,
    // isLoading,
  } as CityHook;
};
