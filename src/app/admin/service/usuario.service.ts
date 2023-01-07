import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../../types/response.type";
import {environment} from "../../../environments/environment";
import {Usuario} from "../../types/usuario.type";
import {Page} from "../../types/page.type";

export class UsuarioService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  delete(id: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.api}/usuarios/${id}`);
  }

  edit(id: string, usuario: Usuario): Observable<Response> {
    return this.http.put<Response>(`${environment.api}/usuarios/${id}`, usuario);
  }

  findAll(): Observable<Page<Usuario>> {
    return this.http.get<Page<Usuario>>(`${environment.api}/usuarios`);
  }

  findAllPage(limit?: number, page?: number): Observable<Page<Usuario>> {
    return this.http.get<Page<Usuario>>(`${environment.api}/usuarios?page=${page?? 1}&limit=${limit?? 5}`);
  }

  findById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.api}/usuarios/${id}`);
  }

  register(usuario: Usuario): Observable<Response> {
    return this.http.post<Response>(`${environment.api}/usuarios`, usuario);
  }
}
