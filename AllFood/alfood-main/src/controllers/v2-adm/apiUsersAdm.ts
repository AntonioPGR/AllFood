import { APIItemAdm } from 'controllers/v2-adm/apiItemAdm';

export class APIUsersAdm extends APIItemAdm{

  constructor(){

    super('http://localhost:8000/api/v2/user/');

  }

}