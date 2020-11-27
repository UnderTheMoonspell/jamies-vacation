import Config from 'config';
import { AnyARecord } from 'dns';
import { City } from 'models/City';
import { Weather } from 'models/Weather';
import { useEffect, useRef, useState } from 'react';
import { kiwiAPI, weatherAPI } from 'services/api.service';
import { sortFunction } from 'services/utils.service';
import { useAPI } from './api.hook';
import { useEffectSkipFirstRun } from './use-effect-skip-first.hook';

export type CityHook = {
  cities: City[];
  isLoading: boolean;
  sortCities: (field: string) => void;
};

export const useCity = (selectedCity: any) => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { isLoading, result, setUrl } = useAPI(ticketsAPI);

  const sortCities = (field: string) => {
    // console.log(cities)
    // cities.sort((a, b) => sortFunction(a, b, field))
    // console.log(cities)
    setCities(prevCities => {
      console.log(prevCities)
      let sortedCities = prevCities.sort((a, b) => sortFunction(a, b, field))
      console.log(sortedCities)
      return sortedCities
    })
  }

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
              feels_like: cityWeather.main.feels_like,
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
            //TODO this could be normalized, the property access would be much more immediate
            const newState = cities.map((city) => {
              if (city.name === availableCities.name) {
                return { ...city, id: ticketInfo.data[0].id, price: ticketInfo.data[0].price };
              } else {
                return city;
              }
            })
            .sort((a, b) => sortFunction(a, b, 'feels_like'))
            return newState; 
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
    sortCities
  } as CityHook;
};
