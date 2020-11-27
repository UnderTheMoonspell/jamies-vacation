import Config from 'config';
import { useAPI } from 'hooks/api.hook';
import React, { ReactElement, useState } from 'react';
import { kiwiAPI } from 'services/api.service';
import { CityItem } from '../CityItem/CityItem';

type SearchRenderComponents = typeof CityItem;

type SearchRenderComponentsProps = any;

type SearchComponentProps = {
  renderedItem: (
    props: SearchRenderComponentsProps
  ) => ReactElement<SearchRenderComponents>;
  url: (searchTerm: string) => string;
  clickHandler: (searchResult: any) => void; //TODO type,
};

export const CustomSearch: React.FC<SearchComponentProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoading, result, setUrl } = useAPI(kiwiAPI);

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchTerm = event.target.value || '';
    setSearchTerm(searchTerm);
    if (searchTerm.length < 3) return;
    setUrl(props.url(searchTerm), 'get', {
      'x-rapidapi-key': Config.geoDBAPIKey,
      'x-rapidapi-host': Config.geoDBRapidHpst,
    });
  };

  const canShowResults = () =>
    result && result.locations?.length && searchTerm.length >= 3;

  const clickItem = (searchResult: any) => {
    props.clickHandler(searchResult);
    setSearchTerm('')
  }

  return (
    <div className={`ui search ${isLoading && 'loading'}`}>
      <div className='ui icon input'>
        <input
          auto-complete='off'
          type='text'
          tab-index='0'
          className='prompt'
          value={searchTerm}
          onChange={handleSearchChange}
          data-testid='search-input'
        />
        <i aria-hidden='true' className='search icon'></i>
      </div>
      <div className={`results transition ${!!searchTerm.length && 'visible'}`}>
        {canShowResults() ? (
          result.locations.map((searchResult: any) => (
            <div
              className='result'
              key={searchResult.id}
              onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                clickItem(searchResult)
              }
            >
              <props.renderedItem {...searchResult} />
            </div>
          ))
        ) : (
          <div className='message empty'>
            <div className='header'>No results found.</div>
          </div>
        )}
      </div>
    </div>
  );
};
