import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../../types/response.type";
import {environment} from "../../../environments/environment";
import {Evento} from "../../types/evento.type";
import {Page} from "../../types/page.type";

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

  findAllPage(limit?: number, page?: number): Observable<Page<Evento>> {
    return this.http.get<Page<Evento>>(`${environment.api}/eventos?page=${page?? 1}&limit=${limit?? 5}`);
  }

  findById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${environment.api}/eventos/${id}`);
  }

  register(evento: Evento): Observable<Response> {
    return this.http.post<Response>(`${environment.api}/eventos`, evento);
  }

}
