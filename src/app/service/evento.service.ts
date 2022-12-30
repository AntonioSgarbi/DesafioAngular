import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../types/response.type";
import {environment} from "../../environments/environment";
import {Evento} from "../types/evento.type";

export class EventoService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  delete(id: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.api}/eventos/${id}`);
  }

  edit(id: string, evento: Evento): Observable<Response> {
    return this.http.put<Response>(`${environment.api}/eventos/${id}`, evento);
  }

  findAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${environment.api}/eventos`);
  }

  findById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${environment.api}/eventos/${id}`);
  }

  register(evento: Evento): Observable<Response> {
    return this.http.post<Response>(`${environment.api}/eventos`, evento);
  }

}
