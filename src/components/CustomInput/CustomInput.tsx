import React from 'react';
import { ErrorMessage, useField } from 'formik';
import { Input } from 'semantic-ui-react';
import { GridComponent } from '../GridComponent/GridComponent';
import { CustomError } from 'components/CustomError/CustomError';

export type CustomInputProps = {
  name: string;
  type: string;
  label: string
}

export const CustomInput: React.FC<CustomInputProps> = ({...props}) => {
  const [field, meta] = useField({ name: props.name, type: props.type });

  return (
    <GridComponent customClass={'custom-input'}>
      <Input
        {...field}
        {...props}
        className={meta.touched && meta.error ? 'error' : ''} />
      <ErrorMessage name={field.name}>{msg => <CustomError msg={msg} />}</ErrorMessage>
    </GridComponent>
  );
};