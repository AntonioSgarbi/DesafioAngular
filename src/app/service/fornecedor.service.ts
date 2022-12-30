import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../types/response.type";
import {environment} from "../../environments/environment";
import {Fornecedor} from "../types/fornecedor.type";

export class FornecedorService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  delete(id: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.api}/fornecedores/${id}`);
  }

  edit(id: string, fornecedor: Fornecedor): Observable<Response> {
    return this.http.put<Response>(`${environment.api}/fornecedores/${id}`, fornecedor);
  }

  findAll(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${environment.api}/fornecedores`);
  }

  findById(id: string): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${environment.api}/fornecedores/${id}`);
  }

  register(fornecedor: Fornecedor): Observable<Response> {
    return this.http.post<Response>(`${environment.api}/fornecedores`, fornecedor);
  }

}
