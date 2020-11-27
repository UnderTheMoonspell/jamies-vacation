import { Weather } from "./Weather";

export type City = {
  id: number;
  name: string;
  weather?: Weather;
  ticket_price: number;
  image: string;
  code: string;
}