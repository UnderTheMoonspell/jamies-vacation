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
// import { CustomSearch } from 'components/CustomSearch/CustomSearch';

const Home = () => {
  const [selectedCity, setSelectedCity] = useState()
  const { cities } = useCity(selectedCity);

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

  return (
    <div className='home'>
      <h1>Home</h1>
      Where are you flying from ? 
      <CustomSearch 
        url={Config.endpoints.LOCATIONS} 
        renderedItem={(props: any) => <CityItem {...props} /> }
        clickHandler={setSelectedCity}
      />
      {/* <div className='paginated-content'>
        <CustomSort
          name='news-sort'
          placeholder='Sort By'
          options={sortOptions}
          onSortFieldChange={onChangeSort}
          data-testid='news-sort'
        />

        {isLoading ? (
          <CustomLoader />
        ) : (
          <div className='news-container'>
            {paginatedData.map((news: NewsModel) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        )}

        {!!totalPages && (
          <CustomPagination
            activePage={currentPage}
            onPageChange={onChangePage}
            totalPages={totalPages}
          />
        )}
      </div> */}
    </div>
  );
};

export default Home;
