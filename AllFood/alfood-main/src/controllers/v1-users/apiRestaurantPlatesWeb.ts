import IPlate from 'interfaces/IPrato';
import { IUrlParams } from 'interfaces/IUrlParams';
import { tCallbackSimple } from 'type/TCallBacks';
import { tErrorHandler } from 'type/TErrorHandler';
import { APIItemWeb } from './apiItemWeb';

export class APIRestaurantPlatesWeb extends APIItemWeb{

  constructor(){

    super('http://localhost:8000/api/v1/restaurantes/');

  }

  public getRestaurantPlates(id:number, params:IUrlParams | undefined, callback:tCallbackSimple<IPlate[]>, errorHandler?:tErrorHandler){

    const mainParams : IUrlParams = {
      ...params,
      extraUrl: `${id}/pratos/`
    };

    super.getItens<IPlate[]>(mainParams, callback, errorHandler);
  }

}