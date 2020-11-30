export type Airport = {
  id: number;
  name: string;
  city: AirportCity;
  code: string;
}

type AirportCity = {
  country: AirportCountry;
  name: string;
}

type AirportCountry = {
  code: string;
}