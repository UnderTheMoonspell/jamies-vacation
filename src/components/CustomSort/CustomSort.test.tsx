import { render, screen } from '@testing-library/react';
import React from 'react';
import { CustomSortProps, CustomSort } from './CustomSort';

const props = {
  name: "select",
  options: [{ value: 1, text: "Portugal" }],
  placeholder: "Sort By"
} as CustomSortProps;

const onSortFieldChange = jest.fn()

it('Renders Sort', () => {
  render(<CustomSort {...props} onSortFieldChange={onSortFieldChange} />)
  expect(screen.getByText('Sort By')).toBeDefined()
});