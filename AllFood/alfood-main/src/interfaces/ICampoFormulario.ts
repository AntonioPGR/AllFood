import { HTMLInputTypeAttribute } from 'react';

export interface ICampoFormulário{
  label: string,
  type: HTMLInputTypeAttribute,
  placeholder?: string,
}