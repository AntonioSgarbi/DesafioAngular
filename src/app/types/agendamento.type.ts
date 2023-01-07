export type Agendamento = {
  _id?: string;
  idUsuario: string;
  idEvento: string;
  nomeUsuario?: string;
  nomeEvento?: string;
  data?: Date | string;
  hora?: string;
}
