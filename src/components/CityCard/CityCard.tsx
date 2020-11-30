import { City } from 'models/City';
import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import './CityCard.scss';

export type CityCardProps = {
  is_best: boolean;
  city: City;
};


//TODO add a link to go to the flight itself
export const CityCard: React.FC<CityCardProps> = (props) => {
  return (
    <Card className={`city-card ${props.is_best && 'is-best'}`}>
      {props.is_best && (
        <Label color={'red'} ribbon>
          Best
        </Label>
      )}
      <Image
        className='city-image'
        src={require(`../../assets/${props.city.name.toLowerCase()}.jpg`)}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{props.city.name}</Card.Header>
        <Card.Meta>
        </Card.Meta>
        <Card.Description>
          <img
            alt='weather icon'
            src={`https://openweathermap.org/img/wn/${props.city.weather?.icon}.png`}
            className='weather-icon'
          ></img>
          <div className="weather-info">
            <span data-testid="temperature">Temperature: {props.city.weather?.temp} º</span>
            <span>Humidity: {props.city.weather?.humidity} %</span>
          </div>
          <span className="price-info" data-testid="price">{props.city.price}€</span>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};
