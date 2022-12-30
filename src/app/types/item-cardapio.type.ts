export interface ItemCardapio {
  _id?: string;
  nome?: string;
  foto?: string;
  preco?: Number;
  descricao?: string;
}
export interface Bebida extends ItemCardapio { }

export interface Comida extends ItemCardapio { }

