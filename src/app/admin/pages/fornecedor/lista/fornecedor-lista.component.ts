import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Fornecedor} from 'src/app/types/fornecedor.type';
import {HttpClient} from "@angular/common/http";
import {FornecedorService} from "../../../service/fornecedor.service";
import {Response} from "../../../../types/response.type";
import {Page} from "../../../../types/page.type";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-lista',
  templateUrl: './fornecedor-lista.component.html',
  styleUrls: ['./fornecedor-lista.component.css']
})
export class FornecedorListaComponent {
  fornecedorService: FornecedorService;
  @ViewChild('paginator') paginator!: MatPaginator;
  displayedColumns: string[] = ['foto', 'nome', 'descricao', 'acoes'];
  dataSource: MatTableDataSource<Fornecedor> = new MatTableDataSource<Fornecedor>([]);

  length?: number;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(private http: HttpClient) {
    this.fornecedorService = new FornecedorService(http);
    this.loadTable();
  }

  loadTable(): void {
    this.fornecedorService.findAllPage().subscribe({
      next: (res: Page<Fornecedor>) => {
        this.dataSource.data = res.docs;
        this.length = res.totalDocs;
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

  setPage(page: PageEvent) {
    this.pageSize = page.pageSize;
    this.pageIndex = page.pageIndex;

    this.fornecedorService.findAllPage(this.pageSize, this.pageIndex + 1).subscribe({
      next: (res: Page<Fornecedor>) => {
        this.dataSource.data = res.docs;
        this.length = res.totalDocs;
      }
    });
  }

}
