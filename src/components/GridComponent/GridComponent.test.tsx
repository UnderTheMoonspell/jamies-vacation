import { render } from '@testing-library/react';
import React from 'react';
import { GridComponent } from './GridComponent';

it('Renders GridComponent', () => {
  const { getByText } = render(
    <GridComponent customClass="lala" >
      <div>hello</div>
    </GridComponent>);

  expect(getByText('hello')).toBeDefined()
});