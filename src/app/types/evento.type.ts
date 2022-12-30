export type Evento = {
  _id?: string;
  nome?: string;
  foto?: string;
  descricao?: string;
  dataInicio?: string;
  dataFim?: string;

  horaInicio?: string;
  horaFim?: string;
  isActive?: Boolean;
  dataCriacao?: Date;
  dataAtualizacao?: Date;
  agendados?: Array<Object>;
}
