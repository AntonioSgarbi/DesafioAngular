import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import {Response} from "../../../../types/response.type";
import {EventoService} from "../../../service/evento.service";
import {Evento} from "../../../../types/evento.type";
import {Page} from "../../../../types/page.type";
import {PageEvent} from "@angular/material/paginator";
import {Fornecedor} from "../../../../types/fornecedor.type";

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.css']
})
export class EventoListaComponent {
  eventoService: EventoService;
  displayedColumns: string[] = ['foto', 'nome', 'descricao', 'dataInicio', 'horaInicio', 'dataFim', 'horaFim', 'acoes'];
  dataSource: MatTableDataSource<Evento> = new MatTableDataSource<Evento>([]);

  length?: number;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(private http: HttpClient) {
    this.eventoService = new EventoService(http);
    this.loadTable();
  }

  loadTable(): void {
    this.eventoService.findAllPage().subscribe({
      next: (res: Page<Evento>) => {
        this.dataSource.data = res.docs;
        this.length = res.totalDocs
      }
    });
  }

  setPage(page: PageEvent) {
    console.log(page)
    this.pageSize = page.pageSize;
    this.pageIndex = page.pageIndex

    this.eventoService.findAllPage(this.pageSize, this.pageIndex + 1).subscribe({
      next: (res: Page<Fornecedor>) => {
        this.dataSource.data = res.docs;
        this.length = res.totalDocs;
      }
    });
  }

  delete(id: string): void {
    if (confirm("Deseja realmente excluir esse cadastro?\nEssa ação não pode ser desfeita")) {
      this.eventoService.delete(id).subscribe({
        next: (res: Response) => {
          this.dataSource.data = this.dataSource.data.filter(x => x._id !== id)
          alert(res.sucesso)
        },
        error: e => console.error(e)
      });
    }
  }

}
