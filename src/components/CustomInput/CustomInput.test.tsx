import { render } from '@testing-library/react';
import { Formik } from 'formik';
import React from 'react';
import { CustomInput, CustomInputProps } from './CustomInput';

const props = {
  name: 'teste',
  type: 'email',
  label: 'Email'
} as CustomInputProps

const submitCallback = () => { }

it('Renders CustomInput', () => {
  const { container } = render(
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={submitCallback}>
      <CustomInput {...props} />
    </Formik>)

  const inputEl = container.querySelector('input') as HTMLInputElement

  expect(inputEl).toBeDefined()
  expect(inputEl.type).toBe(props.type)
  expect(inputEl.name).toBe(props.name)
});