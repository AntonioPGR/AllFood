export default interface IPlate {
  id: number,
  nome: string,
  tag?: string,
  imagem?: string,
  descricao: string,
  restaurante: number,
// eslint-disable-next-line semi
}

export interface IPlatesCreate {
  nome: string,
  tag?: string,
  imagem?: File | null,
  descricao: string,
  restaurante: number,
// eslint-disable-next-line semi
}
