import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {Funcionario} from "../types/funcionario.type";
import {Observable} from "rxjs";
import {Response} from "../types/response.type";

export class FuncionarioService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  delete(id: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.api}/funcionarios/${id}`);
  }

  findAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${environment.api}/funcionarios`);
  }

  findById(id: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${environment.api}/funcionarios/${id}`);
  }

  register(funcionario: Funcionario): Observable<Response> {
    return this.http.post<Response>(`${environment.api}/funcionarios`, funcionario);
  }

  edit(id: string, funcionario: Funcionario): Observable<Response> {
    return this.http.put<Response>(`${environment.api}/funcionarios/${id}`, funcionario);
  }

}
