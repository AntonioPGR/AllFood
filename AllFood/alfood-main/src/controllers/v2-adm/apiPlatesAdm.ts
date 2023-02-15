import { APIItemAdm } from 'controllers/v2-adm/apiItemAdm';
import IPlate, { IPlatesCreate } from 'interfaces/IPrato';
import { IUrlParams } from 'interfaces/IUrlParams';
import { tCallbackSimple } from 'type/TCallBacks';
import { tErrorHandler } from 'type/TErrorHandler';

export class APIPlatesAdm extends APIItemAdm{

  constructor(){

    super('http://localhost:8000/api/v2/pratos/');

  }

  public getPlate(identifier:number , callback:tCallbackSimple<IPlate>, params?:IUrlParams | undefined, errorHandler?:tErrorHandler){
    super.getItem<IPlate>(identifier, callback, params, errorHandler);
  }

  public getPlates(callback:tCallbackSimple<IPlate[]>, params?:IUrlParams | undefined, errorHandler?:tErrorHandler){
    super.getItens<IPlate[]>(callback, params, errorHandler);
  }

  public createPlate(data:IPlatesCreate, callback:tCallbackSimple<unknown>, errorHandler?:tErrorHandler){
    super.createItem<IPlate>(data, callback, errorHandler);
  }

  public updatePlate(identifier:number, data:IPlatesCreate, callback:tCallbackSimple<unknown>, errorHandler?:tErrorHandler){
    super.updateItem<IPlate>(identifier, data, callback, errorHandler);
  }

  public deletePlate(identifier:number, callback:tCallbackSimple<unknown>, errorHandler?:tErrorHandler){
    super.deleteItem(identifier, callback, errorHandler);
  }

}