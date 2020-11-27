import { render, screen } from '@testing-library/react';
import React from 'react';
import { CustomPagination, CustomPaginationProps } from './CustomPagination';

const props = {
  activePage: 2,
  totalPages: 10
} as CustomPaginationProps;

const onPageChange = jest.fn()

it('Renders Custom Pagination', () => {
  render(<CustomPagination {...props} onPageChange={onPageChange} />)
  expect(screen.getByText('10')).toBeDefined()
  expect(screen.getByText('»')).toBeDefined()
  expect(screen.getByText('«')).toBeDefined()
});