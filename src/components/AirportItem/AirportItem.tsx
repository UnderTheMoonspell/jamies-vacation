import { Airport } from 'models/Airport';
import React from 'react';
import './AirportItem.scss'

export const AirportItem : React.FC<Airport> = (props) => {
  return (
    <div className="airport">
      {props.city.name}
      <span className="name">{props.name}</span>
      <i className={`${props.city.country?.code.toLowerCase()} flag`}></i>
    </div>
  );
};