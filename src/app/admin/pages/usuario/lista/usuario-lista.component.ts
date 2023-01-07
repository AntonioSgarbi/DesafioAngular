import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Fornecedor} from "../../../../types/fornecedor.type";
import {HttpClient} from "@angular/common/http";
import {Response} from "../../../../types/response.type";
import {Usuario} from "../../../../types/usuario.type";
import {UsuarioService} from "../../../service/usuario.service";
import {Page} from "../../../../types/page.type";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent {
  usuarioService: UsuarioService;
  displayedColumns: string[] = ['nome', 'isAdmin', 'cpf', 'telefone', 'email', 'acoes'];
  dataSource: MatTableDataSource<Fornecedor> = new MatTableDataSource<Fornecedor>([]);

  length?: number;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(private http: HttpClient) {
    this.usuarioService = new UsuarioService(http);
    this.loadTable();
  }

  loadTable(): void {
    this.usuarioService.findAll().subscribe({
      next: (res: Page<Usuario>) => {
        this.dataSource.data = res.docs;
      }
    });
  }

  setPage(page: PageEvent) {
    this.pageSize = page.pageSize;
    this.pageIndex = page.pageIndex;

    this.usuarioService.findAllPage(this.pageSize, this.pageIndex + 1).subscribe({
      next: (res: Page<Fornecedor>) => {
        this.dataSource.data = res.docs;
        this.length = res.totalDocs;
      }
    });
  }

  delete(id: string): void {
    if (confirm("Deseja realmente excluir esse cadastro?\nEssa ação não pode ser desfeita")) {
      this.usuarioService.delete(id).subscribe({
        next: (res: Response) => {
          this.dataSource.data = this.dataSource.data.filter(x => x._id !== id)
          alert(res.sucesso)
        },
      });
    }
  }
}
