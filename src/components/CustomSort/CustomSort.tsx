import React, { SyntheticEvent } from 'react';
import './CustomSort.scss';
import { DropdownItemProps, DropdownProps, Select } from 'semantic-ui-react';

export type CustomSortProps = {
  options: DropdownItemProps[];
  name: string;
  placeholder: string;
  onSortFieldChange: (sortField: string) => void;
}

export const CustomSort: React.FC<CustomSortProps> = ({onSortFieldChange, ...props}) => {

  const customChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    onSortFieldChange(data.value! as string)
  }

  return (
    <Select
      className="custom-sort"
      {...props}
      onChange={customChange} />
  )
}
