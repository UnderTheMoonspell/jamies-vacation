import { CustomLoader } from 'components/CustomLoader/CustomLoader';
import { CustomSort } from 'components/CustomSort/CustomSort';
import Config from 'config';
import React, { useCallback, useMemo, useState } from 'react';
import { DropdownItemProps } from 'semantic-ui-react';
import './Home.scss';
import { useCity } from 'hooks/city.hook';
import { City } from 'models/City';
import { CustomSearch } from 'components/CustomSearch/CustomSearch';
import { CityItem } from 'components/CityItem/CityItem';
import { CityCard } from 'components/CityCard/CityCard';

const Home = () => {
  const [selectedCity, setSelectedCity] = useState();
  const { cities, isLoading, sortCities, finishedFetching } = useCity(
    selectedCity
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
    (targetCity) => setSelectedCity((prevCity) => targetCity),
    []
  );

  const renderSearchItem = useCallback(
    (props: any) => <CityItem {...props} />,
    []
  );

  const noAvailableFlights = useMemo(
    () => !cities.reduce((acc: number, city: City) => (acc += city.price), 0),
    [cities]
  );

  const getCitiesInfo = useMemo(
    () =>
      cities.map((city: City, idx: number) => (
        <CityCard key={city.id} city={city} is_best={!idx} />
      )),
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

  const displayResults = useMemo(() => {
    if (finishedFetching) {
      if (!noAvailableFlights) {
        return (
          <>
            <CustomSort
              name='city-sort'
              placeholder='Sort By'
              options={sortOptions}
              onSortFieldChange={onChangeSort}
              data-testid='city-sort'
            />
            <div className='results-container'>{getCitiesInfo}</div>
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
  }, [
    finishedFetching,
    getCitiesInfo,
    noAvailableFlights,
    onChangeSort,
    sortOptions,
  ]);

  return (
    <div className='home'>
      <h1>Going back to office planner</h1>
      <h3>Where are you flying from ?</h3>
      <CustomSearch
        url={Config.endpoints.LOCATIONS}
        renderedItem={renderSearchItem}
        clickHandler={onSearchSelect}
      />
      {isLoading ? <CustomLoader /> : displayResults}
    </div>
  );
};

export default Home;
