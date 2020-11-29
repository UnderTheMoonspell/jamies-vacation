import React, { SyntheticEvent } from 'react';
import { DropdownItemProps, DropdownProps, Select } from 'semantic-ui-react';
import { GridComponent } from '../GridComponent/GridComponent';

export type CustomSelectProps = {
  name: string;
  label: string;
  options: DropdownItemProps[];
  placeholder?: string;
  onChange: (selection: any) => {};
}

export const CustomSelect: React.FC<CustomSelectProps> = ({onChange, ...props}) => {

  const customEvent = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    onChange(data.selection)
  }

  return (
    <GridComponent customClass={'custom-select'}>
      <Select
        {...props}
        options={props.options}
        onChange={customEvent}/>
    </GridComponent>
  );
};