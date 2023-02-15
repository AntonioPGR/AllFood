import { IUrlParams } from 'interfaces/IUrlParams';
import { tCallbackSimple } from 'type/TCallBacks';
import { tErrorHandler } from 'type/TErrorHandler';
import { APIRequests } from '../apiRequests';

export class APIItemAdm {

  private APIRequest : APIRequests;
  protected baseUrl : string;

  constructor(baseUrl:string){

    this.baseUrl = baseUrl;
    this.APIRequest = new APIRequests(this.baseUrl);

  }

  protected getItens<tResponse>(callback:tCallbackSimple<tResponse>, params?:IUrlParams | undefined, errorHandler?:tErrorHandler) :void {
    this.APIRequest.get<tResponse>(undefined, params, callback, errorHandler);
  }

  protected getItem<tResponse>(identifier:number , callback:tCallbackSimple<tResponse>, params?:IUrlParams | undefined, errorHandler?:tErrorHandler) :void {
    this.APIRequest.get<tResponse>(identifier, params, callback, errorHandler);
  }

  protected createItem<tResponse>(data:unknown, callback:tCallbackSimple<tResponse>, errorHandler?:tErrorHandler) :void {
    this.APIRequest.post<tResponse>(data, callback, errorHandler);
  }

  protected updateItem<tResponse>(identifier:number, data:unknown, callback:tCallbackSimple<tResponse>, errorHandler?:tErrorHandler) :void {
    this.APIRequest.put<tResponse>(identifier, data, callback, errorHandler);
  }

  protected deleteItem<tResponse>(identifier:number, callback:tCallbackSimple<tResponse>, errorHandler?:tErrorHandler) :void {
    this.APIRequest.delete<tResponse>(identifier, callback, errorHandler);
  }
}