import { APIItemWeb } from 'controllers/v1-users/apiItemWeb';
import { IPaginacao } from 'interfaces/IPaginacao';
import IRestaurant from 'interfaces/IRestaurant';
import { IUrlParams } from 'interfaces/IUrlParams';
import { tCallbackSimple } from 'type/TCallBacks';
import { tErrorHandler } from 'type/TErrorHandler';

export class APIRestaurantWeb extends APIItemWeb{

  constructor(){

    super('http://localhost:8000/api/v1/restaurantes/');

  }

  public getRestaurants(params:IUrlParams | undefined, callback:tCallbackSimple<IPaginacao<IRestaurant>>, errorHandler?:tErrorHandler){
    super.getItens<IPaginacao<IRestaurant>>(params, callback, errorHandler);
  }

}
