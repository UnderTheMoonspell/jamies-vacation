import { CustomLoader } from 'components/CustomLoader/CustomLoader';
import { CustomSort } from 'components/CustomSort/CustomSort';
import Config from 'config';
import { usePaginatioAndSort } from 'hooks/pagination-sort.hook';
import React, { useState } from 'react';
import { DropdownItemProps } from 'semantic-ui-react';
// import { API } from 'services/api.service';
import './Home.scss';
import { useCity } from 'hooks/city.hook';
import { City } from 'models/City';
import { CustomSearch } from 'components/CustomSearch/CustomSearch';
import { CityItem } from 'components/CityItem/CityItem';
import { CityCard } from 'components/CityCard/CityCard';
// import { CustomSearch } from 'components/CustomSearch/CustomSearch';

const Home = () => {
  const [selectedCity, setSelectedCity] = useState()
  const { cities, isLoading } = useCity(selectedCity);

  // const {
  //   paginatedData,
  //   currentPage,
  //   onChangePage,
  //   onChangeSort,
  //   isLoading,
  //   totalPages,
  // } = usePaginatioAndSort<NewsModel>(getNews);

  const sortOptions = [
    {
      text: 'Start Date',
      value: 'start_date',
    },
    {
      text: 'Id',
      value: 'id',
    },
  ] as DropdownItemProps[];

  const getCitiesInfo = () => cities.map((city: City, idx:number) => (
    <CityCard key={city.id} city={city} is_best={!idx} />
  ))

  return (
    <div className='home'>
      <h1>Going back to office planner</h1>
      <h2>Where are you flying from ?</h2>
      <CustomSearch 
        url={Config.endpoints.LOCATIONS} 
        renderedItem={(props: any) => <CityItem {...props} /> }
        clickHandler={setSelectedCity}
      />
        {isLoading ? (
          <CustomLoader />
        ) : (
          <div className='results-container'>
            {cities[0]?.ticket_price ? getCitiesInfo() : <div>Please choose your origin</div>}
          </div>
        )}
    </div>
  );
};

export default Home;
