import Config from 'config';
import { useAPI } from 'hooks/api.hook';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { kiwiAPI } from 'services/api.service';
import { AirportItem } from '../AirportItem/AirportItem';

// this type can be extended to accept new types of render components
type SearchRenderComponents = typeof AirportItem;

type SearchRenderComponentsProps = any;

type SearchComponentProps = {
  renderedItem: (
    props: SearchRenderComponentsProps
  ) => ReactElement<SearchRenderComponents>;
  url: (searchTerm: string) => string;
  clickHandler: (searchResult: any) => void;
};

// Memoization to avoid rerenders when parent state, not related to CustomSearch, changes
export const CustomSearch: React.FC<SearchComponentProps> = React.memo(
  (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isResultContainerOpen, setResultContainerOpen] = useState(false);
    const { isLoading, result, setUrl } = useAPI(kiwiAPI);

    const handleSearchChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setResultContainerOpen(true);
      const searchTerm = event.target.value || '';
      setSearchTerm(searchTerm);
      if (searchTerm.length < 3) return;
      setUrl(props.url(searchTerm), 'get');
    };

    // TODO finding another way to filter out the cities so as to make CustomSearch not
    // responsible for this to improve reusabillity
    
    // Has results to show, useMemo to rerender only when result and searchterm changes
    const canShowResults = useMemo(() => {
      return (result?.length > 1 && searchTerm.length >= 3) ||
      (result?.length === 1 &&
        Config.destinations.findIndex(
          (destination) => destination.name === result[0].city.name
        ) < 0);
    }, [result, searchTerm])

    // Do not show the destinations
    const getFilteredResults = useMemo(() => {
      return canShowResults ? result.filter(
        (city: any) =>
          Config.destinations.findIndex(
            (destination) => destination.name === city.city.name
          ) < 0
      ) as any[] : [];
    }, [canShowResults, result]);

    const clickItem = (searchResult: any) => {
      props.clickHandler(searchResult);
      setSearchTerm('');
    };

    const areResultsVisible = () => searchTerm.length && isResultContainerOpen

    const onInputFocus = () => setResultContainerOpen(true)

    useEffect(() => {
      const checkIfClickOutside = (e: any) => {
        if(e.target.contains(document.getElementsByClassName('results')[0])) {
          setResultContainerOpen(false)
        }
      }

      window.addEventListener('click', checkIfClickOutside)

      return (() => window.removeEventListener('click', checkIfClickOutside))
    }, [])

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
            onFocus={onInputFocus}
            data-testid='search-input'
          />
          <i aria-hidden='true' className='search icon'></i>
        </div>
        <div
          className={`results transition ${areResultsVisible() && 'visible'}`}
          data-testid='results-container'
        >
          {/* TODO This JSX code could have improved readability */}
          {canShowResults ? (
            getFilteredResults.map((searchResult: any) => (
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
  }
);
