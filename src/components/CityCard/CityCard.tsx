import Config from 'config';
import { City } from 'models/City';
import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import { StandardDate } from '../../filters/StandardDate/StandardDate';
import './CityCard.scss';

export type CityCardProps = {
  is_best: boolean;
  city: City;
};

export const CityCard: React.FC<CityCardProps> = (props) => {
  return (
    <Card className='city-card'>
      {props.is_best && (
        <Label color={'red'} ribbon>
          Best
        </Label>
      )}
      <Image
        className='city-image'
        src={require(`../../../public/${props.city.name.toLowerCase()}.jpg`)}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{props.city.name}</Card.Header>
        <Card.Meta>
          {/* <span className='date'>
            <StandardDate date={props.city.start_date} />
          </span> */}
        </Card.Meta>
        <Card.Description>
          <img
            alt='weather icon'
            src={`https://openweathermap.org/img/wn/${props.city.weather?.icon}.png`}
            className='weather-icon'
          ></img>
          <div className="weather-info">
            <span>Temperature: {props.city.weather?.temp} º</span>
            <span>Humidity: {props.city.weather?.humidity} %</span>
          </div>
          <span className="price-info">{props.city.price}€</span>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};
