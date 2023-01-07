import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../../types/response.type";
import {environment} from "../../../environments/environment";
import {Evento} from "../../types/evento.type";
import {Page} from "../../types/page.type";
import {Agendamento} from "../../types/agendamento.type";

export class AgendamentoService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  delete(id: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.api}/agendamentos/${id}`);
  }

  edit(id: string, agendamento: Agendamento): Observable<Response> {
    return this.http.put<Response>(`${environment.api}/agendamentos/${id}`, agendamento);
  }

  findAll(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${environment.api}/agendamentos`);
  }

  findAllPage(limit?: number, page?: number): Observable<Page<Agendamento>> {
    return this.http.get<Page<Agendamento>>(`${environment.api}/agendamentos?page=${page?? 1}&limit=${limit?? 5}`);
  }

  findById(id: string): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${environment.api}/agendamentos/${id}`);
  }

  register(agendamento: Agendamento): Observable<Response> {
    return this.http.post<Response>(`${environment.api}/agendamentos`, agendamento);
  }

}
