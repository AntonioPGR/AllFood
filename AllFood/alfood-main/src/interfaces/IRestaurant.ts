import IPlate from './IPrato';

export default interface IRestaurant {
  id: number
  nome: string
// eslint-disable-next-line semi
}

export default interface IRestaurantPlates {
  id: number
  nome: string
  pratos: IPlate[]
// eslint-disable-next-line semi
}

export interface IRestaurantsCreate {
  nome: string
}