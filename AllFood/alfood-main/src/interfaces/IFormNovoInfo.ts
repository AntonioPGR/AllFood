import { ICampoFormulário } from './ICampoFormulario';

export interface IFormNovoInfo<Data>{
  title: string,
  campos: ICampoFormulário[],
  onSubmit: (data:Data) => void,
  buttonLabel?: string
}