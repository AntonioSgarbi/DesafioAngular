import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Fornecedor} from 'src/app/types/fornecedor.type';
import {HttpClient} from "@angular/common/http";
import {FornecedorService} from "../../../../service/fornecedor.service";
import {Response} from "../../../../types/response.type";

@Component({
  selector: 'app-lista',
  templateUrl: './fornecedor-lista.component.html',
  styleUrls: ['./fornecedor-lista.component.css']
})
export class FornecedorListaComponent {
  fornecedorService: FornecedorService;
  displayedColumns: string[] = ['foto', 'nome', 'descricao', 'acoes'];
  dataSource: MatTableDataSource<Fornecedor> = new MatTableDataSource<Fornecedor>([]);

  constructor(private http: HttpClient) {
    this.fornecedorService = new FornecedorService(http);
    this.loadTable();
  }

  loadTable(): void {
    this.fornecedorService.findAll().subscribe({
      next: (res: Fornecedor[]) => {
        this.dataSource.data = res;
        console.log(res)
      }
    });
  }

  delete(id: string): void {
    if (confirm("Deseja realmente excluir esse cadastro?\nEssa ação não pode ser desfeita")) {
      this.fornecedorService.delete(id).subscribe({
        next: (res: Response) => {
          this.dataSource.data = this.dataSource.data.filter(x => x._id !== id)
          alert(res.sucesso)
        },
      });
    }
  }

}
