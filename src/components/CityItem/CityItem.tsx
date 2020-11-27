import React from 'react';
import './CityItem.scss'

export const CityItem : React.FC<any> = (props) => {
  return (
    <div className="city-item">
      {props.city}
    </div>
  );
};