import { Weather } from "./Weather";

export type City = {
  id: number;
  name: string;
  weather?: Weather;
  price: number;
  feels_like: number;
  image: string;
  code: string;
}