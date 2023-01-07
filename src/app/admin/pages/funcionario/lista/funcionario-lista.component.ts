import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Funcionario} from "../../../../types/funcionario.type";
import {HttpClient} from "@angular/common/http";
import {FuncionarioService} from "../../../service/funcionario.service";
import {Response} from "../../../../types/response.type";
import {Page} from "../../../../types/page.type";
import {PageEvent} from "@angular/material/paginator";
import {Fornecedor} from "../../../../types/fornecedor.type";

@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.css']
})
export class FuncionarioListaComponent {
  funcionarioService: FuncionarioService;
  displayedColumns: string[] = ['foto', 'nome', 'idade', 'cargo', 'naturalidade', 'Ano Admissao', 'acoes'];
  dataSource: MatTableDataSource<Funcionario> = new MatTableDataSource<Funcionario>([]);

  length?: number;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(private http: HttpClient) {
    this.funcionarioService = new FuncionarioService(http);
    this.loadTable();
  }

  loadTable(): void {
    this.funcionarioService.findAllPage().subscribe({
      next: (res: Page<Funcionario>) => {
        this.dataSource.data = res.docs;
        this.length = res.totalDocs;
      }
    });
  }

  setPage(page: PageEvent) {
    this.pageSize = page.pageSize;
    this.pageIndex = page.pageIndex;

    this.funcionarioService.findAllPage(this.pageSize, this.pageIndex + 1).subscribe({
      next: (res: Page<Fornecedor>) => {
        this.dataSource.data = res.docs;
        this.length = res.totalDocs;
      }
    });
  }

  delete(id: string): void {
    if (confirm("Deseja realmente excluir esse cadastro?\nEssa ação não pode ser desfeita")) {
      this.funcionarioService.delete(id).subscribe({
        next: (res: Response) => {
          this.dataSource.data = this.dataSource.data.filter(x => x._id !== id)
          alert(res.sucesso)
        }
      });
    }
  }

}
