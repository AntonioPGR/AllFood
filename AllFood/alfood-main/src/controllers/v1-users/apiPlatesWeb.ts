import { APIItemWeb } from 'controllers/v1-users/apiItemWeb';
import IPlate from 'interfaces/IPrato';
import { IUrlParams } from 'interfaces/IUrlParams';
import { tCallbackSimple } from 'type/TCallBacks';
import { tErrorHandler } from 'type/TErrorHandler';

export class APIPlatesWeb extends APIItemWeb{

  constructor(){

    super('http://localhost:8000/api/v1/pratos/');

  }

  public getPlates(params:IUrlParams | undefined, callback:tCallbackSimple<IPlate[]>, errorHandler?:tErrorHandler){
    super.getItens<IPlate[]>(params, callback, errorHandler);
  }

}