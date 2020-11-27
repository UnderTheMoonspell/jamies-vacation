import Config from 'config';
import { City } from 'models/City';
import { Weather } from 'models/Weather';
import { useEffect, useRef, useState } from 'react';
import { kiwiAPI, weatherAPI } from 'services/api.service';
import { useAPI } from './api.hook';
import { useEffectSkipFirstRun } from './use-effect-skip-first.hook';

export type CityHook = {
  cities: City[];
  isLoading: boolean;
};

export const useCity = (selectedCity: any) => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { isLoading, result, setUrl } = useAPI(ticketsAPI);

  useEffect(() => {
    const getDestinationsWeather = async () =>
      await Promise.all(
        Config.destinations.map(async (city) => {
          //rework apiHook to accept consecutive updates
          let cityWeather = await weatherAPI.get(
            Config.endpoints.GET_WEATHER_BY_CITY(city.name) //Types for given cities
          );
          setCities((cities) => [
            ...cities,
            { 
              name: city.name, 
              weather: { 
                icon: cityWeather.weather[0].icon,
                humidity: cityWeather.main.humidity,
                temp: cityWeather.main.temp
              } as Weather
            } as City
          ]);
        })
      );

    getDestinationsWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    debugger;
    const getDestinationsPrices = async () => {
      setIsLoading(true)
      await Promise.all(
        Config.destinations.map(async (availableCities) => {
          let ticketInfo = await kiwiAPI.get(
            Config.endpoints.GET_TICKET_INFO(selectedCity.code, availableCities.code, '23/12/2020', '31/12/2022')
          );
          setCities((cities) => {
            //TODO optimization
            debugger
            const newState = cities.map((city) => {
              if (city.name === availableCities.name) {
                return { ...city, ticket_price: ticketInfo.data[0].price };
              } else {
                return city;
              }
            })
            .sort((a: City, b: City) => (a.ticket_price > b.ticket_price) ? 1 : ((b.ticket_price > a.ticket_price) ? -1 : 0))
            return newState; 
            // [...cities, { name: cityWeather.name, weather: cityWeather.weather}]
          });
        })
      );
      setIsLoading(false)
    }

    selectedCity?.name && getDestinationsPrices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  // useEffectSkipFirstRun(() => {
  //   debugger
  //   result && setCities(cities => [...cities, { name: result.name, weather: result.weather}])
  // }, [result])

  return {
    cities,
    isLoading,
  } as CityHook;
};
