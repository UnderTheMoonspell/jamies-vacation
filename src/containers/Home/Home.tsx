import { CustomLoader } from 'components/CustomLoader/CustomLoader';
import { CustomSort } from 'components/CustomSort/CustomSort';
import Config from 'config';
import React, { useState } from 'react';
import { DropdownItemProps } from 'semantic-ui-react';
import './Home.scss';
import { useCity } from 'hooks/city.hook';
import { City } from 'models/City';
import { CustomSearch } from 'components/CustomSearch/CustomSearch';
import { CityItem } from 'components/CityItem/CityItem';
import { CityCard } from 'components/CityCard/CityCard';

const Home = () => {
  const [selectedCity, setSelectedCity] = useState();
  const { cities, isLoading, sortCities } = useCity(selectedCity);

  const onChangeSort = (sortField: string) => {
    sortCities(sortField.split('|')[0], sortField.split('|')[1] as "desc" | "asc");
  };

  const areResultsFetched = () => cities[0]?.price;

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

  const getCitiesInfo = () =>
    cities.map((city: City, idx: number) => (
      <CityCard key={city.id} city={city} is_best={!idx} />
    ));

  return (
    <div className='home'>
      <h1>Going back to office planner</h1>
      <h3>Where are you flying from ?</h3>
      <CustomSearch
        url={Config.endpoints.LOCATIONS}
        renderedItem={(props: any) => <CityItem {...props} />}
        clickHandler={setSelectedCity}
      />
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          {areResultsFetched() && (
            <CustomSort
              name='city-sort'
              placeholder='Sort By'
              options={sortOptions}
              onSortFieldChange={onChangeSort}
              data-testid='city-sort'
            />
          )}
          <div className='results-container'>
            {areResultsFetched() && getCitiesInfo()}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
