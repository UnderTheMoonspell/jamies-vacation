import React, { SyntheticEvent } from 'react';
import { ErrorMessage, useField } from 'formik';
import { DropdownItemProps, DropdownProps, Select } from 'semantic-ui-react';
import { GridComponent } from '../GridComponent/GridComponent';
import { CustomError } from 'components/CustomError/CustomError';

export type CustomSelectProps = {
  name: string;
  label: string;
  options: DropdownItemProps[];
  placeholder?: string;
  onChange: (selection: any) => {};
}

export const CustomSelect: React.FC<CustomSelectProps> = ({onChange, ...props}) => {
  const [field, meta] = useField({ name: props.name });

  const customEvent = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    onChange(data.selection)
  }

  return (
    <GridComponent customClass={'custom-select'}>
      <Select
        {...field}
        {...props}
        options={props.options}
        onChange={customEvent}
        className={meta.touched && meta.error ? 'error' : ''} />
      <ErrorMessage name={field.name}>{msg => <CustomError msg={msg} />}</ErrorMessage>
    </GridComponent>
  );
};