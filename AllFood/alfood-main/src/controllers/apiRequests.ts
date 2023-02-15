// EXTERNAL
import axios from 'axios';
import { IUrlParams } from 'interfaces/IUrlParams';
import { tCallbackSimple } from 'type/TCallBacks';
import { tErrorHandler } from 'type/TErrorHandler';

// TYPES
import { tHttpVerbs } from 'type/THttpVerbs';



export class APIRequests{

  private baseURL : string;

  constructor(url:string){
    this.baseURL = url;
  }

  private callAPI<ResponseType>(url: string, method:tHttpVerbs, callBack:tCallbackSimple<ResponseType>, data?: unknown | undefined, errorHandle?:tErrorHandler ):void {

    let apiFunc;
    switch(method){
    case 'GET':
      apiFunc = axios.get;
      break;
    case 'POST':
      apiFunc = axios.post;
      break;
    case 'PUT':
      apiFunc = axios.put;
      break;
    case 'PATCH':
      apiFunc = axios.patch;
      break;
    case 'DELETE':
      apiFunc = axios.delete;
      break;
    default:
      throw new Error('Sem metodo correspondente ao tentar executar o resquest a API');
    }

    apiFunc<ResponseType>(url, data? data : {})
      .then((response) => {
        callBack(response.data);
      })
      .catch((errorMessage) => {
        if(errorHandle){
          errorHandle(errorMessage);
          return;
        }
        throw new Error(errorMessage);
      });

  }

  public get<tResponse>(id:number | string | undefined, params:IUrlParams | undefined, callback:tCallbackSimple<tResponse>, errorHandler?:tErrorHandler){

    let url = typeof id !== 'undefined' ? this.baseURL + `${id}/` : this.baseURL;

    if(params){
      url += params.extraUrl? params.extraUrl : '';
      url += '?';
      Object.entries(params).map((value) => {
        if(value[0] === 'extraUrl'){ return; }
        url += `${value[0]}=${value[1]}&`;
      });
    }

    this.callAPI(url, 'GET', callback, undefined, errorHandler);
  }

  public post<tResponse>(data:unknown, callback:tCallbackSimple<tResponse>, errorHandler?:tErrorHandler){
    this.callAPI(this.baseURL, 'POST', callback, data, errorHandler);
  }

  public put<tResponse>(id:number, data:unknown, callback:tCallbackSimple<tResponse>, errorHandler?:tErrorHandler){
    const url = this.baseURL + `${id}/`;
    this.callAPI(url, 'PUT', callback, data, errorHandler);
  }

  public patch<tResponse>(id:number, data:unknown, callback:tCallbackSimple<tResponse>, errorHandler?:tErrorHandler){
    const url = this.baseURL + `${id}/`;
    this.callAPI(url, 'PATCH', callback, data, errorHandler);
  }

  public delete<tResponse>(id:number, callback:tCallbackSimple<tResponse>, errorHandler?:tErrorHandler){
    const url = this.baseURL + `${id}/`;
    this.callAPI(url, 'DELETE', callback, undefined, errorHandler);
  }

}