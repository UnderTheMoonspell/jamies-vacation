import { render } from '@testing-library/react';
import React from 'react';
import { StandardDate } from './StandardDate';

it('Renders StandardDate', () => {
  const { getByText } = render(<StandardDate date="2018-01-03 18:12:31" />)
  expect(getByText('03/01/2018')).toBeDefined()
});