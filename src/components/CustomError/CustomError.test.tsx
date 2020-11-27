import { render } from '@testing-library/react';
import React from 'react';
import { CustomError } from './CustomError';

it('Renders CustomError', () => {
  const { getByText } = render(<CustomError msg="lala" />)
  expect(getByText('lala')).toBeDefined()
});