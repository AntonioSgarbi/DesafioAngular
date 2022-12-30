import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import {Response} from "../../../../types/response.type";
import {ItemCardapioService} from "../../../../service/item-cardapio.service";
import {ItemCardapio} from "../../../../types/item-cardapio.type";
import {EnumItemsCardapio} from "../../../../types/enums/items-cardapio.enum";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-lista',
  templateUrl: './item-cardapio-lista.component.html',
  styleUrls: ['./item-cardapio-lista.component.css']
})
export class ItemCardapioListaComponent {
  @ViewChild('select', {static: true}) select!: MatSelect;
  itemCardapioTipo: any = EnumItemsCardapio;
  itemCardapio: EnumItemsCardapio = EnumItemsCardapio.bebidas;
  itemCardapioService: ItemCardapioService;
  displayedColumns: string[] = ['foto', 'nome', 'descricao', 'acoes'];
  dataSource: MatTableDataSource<ItemCardapio> = new MatTableDataSource<ItemCardapio>([]);

  constructor(private http: HttpClient) {
    this.itemCardapioService = new ItemCardapioService(http);
    this.loadTable();
  }

  loadTable(): void {
    this.itemCardapioService.findAll(this.getModelKey()).subscribe({
      next: (res: ItemCardapio[]) => {
        this.dataSource.data = res;
      }
    });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.value === o2;
  }

  delete(id: string): void {
    if (confirm("Deseja realmente excluir esse cadastro?\nEssa ação não pode ser desfeita")) {
      this.itemCardapioService.delete(id, this.itemCardapio).subscribe({
        next: (res: Response) => {
          this.dataSource.data = this.dataSource.data.filter(x => x._id !== id)
          alert(res.sucesso)
        },
      });
    }
  }

  getModelValue(): string {
    // @ts-ignore
    return this.itemCardapio.value ?? 'Bebida';
  }

  getModelKey(): string {
    // @ts-ignore
    return this.itemCardapio.key ?? 'bebidas';
  }

  modelChanged(selected: EnumItemsCardapio) {
    this.itemCardapio = selected;
    this.loadTable();
  }

}
