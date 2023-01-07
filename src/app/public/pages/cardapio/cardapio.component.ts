import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Comida} from "../../../types/comida.type";
import {Bebida} from "../../../types/item-cardapio.type";

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent {

  comidas!: Comida[];
  bebidas!: Bebida[];

  constructor(private http: HttpClient) {

    this.http.get<any>(`${environment.api}/comidas/all`).subscribe({
      next: res => {
        this.comidas = res;
      }
    });

    this.http.get<Bebida[]>(`${environment.api}/bebidas/all`).subscribe({
      next: res => {
        this.bebidas = res;
      }
    });
  }

}
