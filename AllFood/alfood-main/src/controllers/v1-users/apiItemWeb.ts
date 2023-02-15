import { APIRequests } from 'controllers/apiRequests';
import { IUrlParams } from 'interfaces/IUrlParams';
import { tCallbackSimple } from 'type/TCallBacks';
import { tErrorHandler } from 'type/TErrorHandler';

export class APIItemWeb {

  private APIRequest : APIRequests;
  private baseUrl : string;

  constructor(baseUrl:string){

    this.baseUrl = baseUrl;
    this.APIRequest = new APIRequests(this.baseUrl);

  }

  protected getItens<tResponse>(params:IUrlParams | undefined, callback:tCallbackSimple<tResponse>, errorHandler?:tErrorHandler) :void {
    this.APIRequest.get<tResponse>(undefined, params, callback, errorHandler);
  }
  
}