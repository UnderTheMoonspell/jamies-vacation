import React from 'react';
import News from './Home';
import {
  cleanup,
  render,
  waitFor,
  fireEvent,
  screen,
} from '@testing-library/react';
import { API } from 'services/api.service';
import { selectOption } from 'services/test.helpers';
import Config from 'config';
import { BrowserRouter } from 'react-router-dom';

const newsPage1 = {
  total: 30,
  data: [
    {
      id: 1,
      title: {
        text: 'News 1',
      },
      text: {
        text: 'News 1 description',
      },
      start_date: '2020-07-11 14:00:02',
    },
    {
      id: 2,
      title: {
        text: 'News 2',
      },
      text: {
        text: 'News 2 description',
      },
      start_date: '2020-07-05 10:43:04',
    },
  ],
};

const newsPage2 = {
  total: 30,
  data: [
    {
      id: 2,
      title: {
        text: 'News 13',
      },
      text: {
        text: 'News 13 description',
      },
      start_date: '2020-10-06 22:00:01',
    },
    {
      id: 1,
      title: {
        text: 'News 14',
      },
      text: {
        text: 'News 14 description',
      },
      start_date: '2020-07-20 21:44:05',
    },
  ],
};

describe('News', () => {
  afterEach(cleanup);

  it('Renders News', async () => {
    API.get = jest.fn(() => Promise.resolve(newsPage1)) as any;

    const { container } = render(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('News 1')).toBeInTheDocument());

    expect(API.get).toHaveBeenCalledWith(
      Config.endpoints.GET_NEWS({ page: 1 })
    );
    expect(screen.getByText('News 2')).toBeInTheDocument();
    expect(screen.getByText('News 2 description')).toBeInTheDocument();

    const paginationElm = container.querySelector('.pagination') as HTMLElement;

    expect(paginationElm.childElementCount).toBe(7);
  });

  it('Changes news page and sort', async () => {
    API.get = jest.fn().mockResolvedValueOnce(newsPage1);

    const { container } = render(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('News 1')).toBeInTheDocument());

    const sortElm: HTMLElement = screen.getByTestId('news-sort');

    expect(sortElm).toBeInTheDocument();

    const paginationElm: HTMLElement = container.querySelector(
      '.pagination'
    ) as HTMLElement;

    const secondPageButton = paginationElm.children[3];

    API.get = jest.fn().mockResolvedValueOnce(newsPage2);

    fireEvent.click(secondPageButton);

    expect(API.get).toHaveBeenCalledWith(
      Config.endpoints.GET_NEWS({ page: 2 })
    );

    await waitFor(() =>
      expect(screen.queryByText('News 13')).toBeInTheDocument()
    );

    expect(screen.queryByText('News 2')).not.toBeInTheDocument();
    expect(screen.queryByText('News 14 description')).toBeInTheDocument();

    await selectOption(sortElm, 'Start Date');

    expect(
      container
        .querySelector('.news-container')
        ?.children[0].querySelector('.header')?.innerHTML
    ).toBe('News 14');

    await selectOption(sortElm, 'Id');

    expect(
      container
        .querySelector('.news-container')
        ?.children[0].querySelector('.header')?.innerHTML
    ).toBe('News 14');
  });
});
