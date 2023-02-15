import { APIItemAdm } from 'controllers/v2-adm/apiItemAdm';
import { ITagApiResponse } from 'interfaces/ITag';
import { tCallbackSimple } from 'type/TCallBacks';
import { tErrorHandler } from 'type/TErrorHandler';

export class APITagsAdm extends APIItemAdm{

  constructor(){
    super('http://localhost:8000/api/v2/tags/');
  }

  public getTags(callback:tCallbackSimple<ITagApiResponse>, errorHandler?:tErrorHandler){
    super.getItens<ITagApiResponse>(callback, undefined, errorHandler);
  }

}