import IRestaurant, { IRestaurantsCreate } from 'interfaces/IRestaurant';
import { IUrlParams } from 'interfaces/IUrlParams';
import { tCallbackSimple } from 'type/TCallBacks';
import { tErrorHandler } from 'type/TErrorHandler';
import { APIItemAdm } from './apiItemAdm';

export class APIRestaurantAdm extends APIItemAdm{

  constructor(){

    super('http://localhost:8000/api/v2/restaurantes/');

  }

  public getRestaurant(identifier:number , callback:tCallbackSimple<IRestaurant>, params?:IUrlParams | undefined, errorHandler?:tErrorHandler){
    super.getItem<IRestaurant>(identifier, callback, params, errorHandler);
  }

  public getRestaurants(callback:tCallbackSimple<IRestaurant[]>, params?:IUrlParams | undefined, errorHandler?:tErrorHandler){
    super.getItens<IRestaurant[]>(callback, params, errorHandler);
  }

  public createRestaurant(data:IRestaurantsCreate, callback:tCallbackSimple<unknown>, errorHandler?:tErrorHandler){
    super.createItem<IRestaurant>(data, callback, errorHandler);
  }

  public updateRestaurant(identifier:number, data:IRestaurantsCreate, callback:tCallbackSimple<unknown>, errorHandler?:tErrorHandler){
    super.updateItem<IRestaurant>(identifier, data, callback, errorHandler);
  }

  public deleteRestaurant(identifier:number, callback:tCallbackSimple<unknown>, errorHandler?:tErrorHandler){
    super.deleteItem(identifier, callback, errorHandler);
  }

}
