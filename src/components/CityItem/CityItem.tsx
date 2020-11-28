import React from 'react';
import './CityItem.scss'

export const CityItem : React.FC<any> = (props) => {
  return (
    <div className="city-item">
      {props.city.name}
      <span className="airport">{props.name}</span>
      <i className={`${props.city.country?.code.toLowerCase()} flag`}></i>
    </div>
  );
};