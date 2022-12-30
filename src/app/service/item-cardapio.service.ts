import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../types/response.type";
import {environment} from "../../environments/environment";
import {Fornecedor} from "../types/fornecedor.type";
import { EnumItemsCardapio } from '../types/enums/items-cardapio.enum';
import {ItemCardapio} from "../types/item-cardapio.type";

export class ItemCardapioService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  delete(id: string, itemCardapio: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.api}/${itemCardapio}/${id}`);
  }

  edit(id: string, item: ItemCardapio, itemCardapio: string): Observable<Response> {
    return this.http.put<Response>(`${environment.api}/${itemCardapio}/${id}`, item);
  }

  findAll(itemCardapio: string): Observable<ItemCardapio[]> {
    return this.http.get<ItemCardapio[]>(`${environment.api}/${itemCardapio}`);
  }

  findById(id: string, itemCardapio: string): Observable<ItemCardapio> {
    return this.http.get<Fornecedor>(`${environment.api}/${itemCardapio}/${id}`);
  }

  register(item: ItemCardapio, itemCardapio: string): Observable<Response> {
    return this.http.post<Response>(`${environment.api}/${itemCardapio}`, item);
  }

}
