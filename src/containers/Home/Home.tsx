import { CustomLoader } from 'components/CustomLoader/CustomLoader';
import { CustomSort } from 'components/CustomSort/CustomSort';
import Config from 'config';
import React, { useCallback, useMemo, useState } from 'react';
import { DropdownItemProps } from 'semantic-ui-react';
import './Home.scss';
import { useCity } from 'hooks/city.hook';
import { City } from 'models/City';
import { CustomSearch } from 'components/CustomSearch/CustomSearch';
import { AirportItem } from 'components/AirportItem/AirportItem';
import { CityCard } from 'components/CityCard/CityCard';
import { Airport } from 'models/Airport';

const Home = () => {
  const [selectedAirport, setSelectedAirport] = useState<Airport>();
  const { cities, isLoading, sortCities, finishedFetching } = useCity(
    selectedAirport
  );

  const sortOptions = [
    {
      text: 'Weather',
      value: 'feels_like|desc',
    },
    {
      text: 'Price',
      value: 'price|asc',
    },
    {
      text: 'Price & Weather',
      value: 'price,feels_like|asc,desc',
    },
  ] as DropdownItemProps[];

  const onSearchSelect = useCallback(
    (airport) => setSelectedAirport(airport),
    []
  );

  const renderSearchItem = useCallback(
    (props: Airport) => <AirportItem {...props} />,
    []
  );

  const noAvailableFlights = useMemo(
    () => !cities.reduce((acc: number, city: City) => (acc += city.price), 0),
    [cities]
  );

  const onChangeSort = useCallback(
    (sortField: string) => {
      sortCities(
        sortField.split('|')[0],
        sortField.split('|')[1] as 'desc' | 'asc'
      );
    },
    [sortCities]
  );

  const flightResults = () => {
    if (finishedFetching) {
      if (!noAvailableFlights) {
        return (
          <>
            <h3>
              Flying from &nbsp;
              <span className='selected-city'>
                {selectedAirport?.name}, {selectedAirport?.city.country.name}
              </span>
            </h3>
            <CustomSort
              name='city-sort'
              placeholder='Sort By'
              options={sortOptions}
              onSortFieldChange={onChangeSort}
              data-testid='city-sort'
            />
            <div className='results-container'>
              {cities.map((city: City, idx: number) => (
                <CityCard key={city.id} city={city} is_best={!idx} />
              ))}
            </div>
          </>
        );
      } else {
        return (
          <div className='empty-results'>
            No flights from the chosen destination
          </div>
        );
      }
    }
  };

  return (
    <div className='home'>
      <h1>Office planner</h1>
      <h3>Where are you flying from ?</h3>
      <CustomSearch
        url={Config.endpoints.LOCATIONS}
        renderedItem={renderSearchItem}
        clickHandler={onSearchSelect}
      />
      {isLoading ? <CustomLoader /> : flightResults()}
    </div>
  );
};

export default Home;
