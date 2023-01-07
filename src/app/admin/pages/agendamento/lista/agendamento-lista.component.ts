import {Component, OnInit} from '@angular/core';
import {EventoService} from "../../../service/evento.service";
import {MatTableDataSource} from "@angular/material/table";
import {Evento} from "../../../../types/evento.type";
import {HttpClient} from "@angular/common/http";
import {Page} from "../../../../types/page.type";
import {PageEvent} from "@angular/material/paginator";
import {Fornecedor} from "../../../../types/fornecedor.type";
import {Response} from "../../../../types/response.type";
import {AgendamentoService} from "../../../service/agendamento.service";
import {Agendamento} from "../../../../types/agendamento.type";

@Component({
  selector: 'app-lista',
  templateUrl: './agendamento-lista.component.html',
  styleUrls: ['./agendamento-lista.component.css']
})
export class AgendamentoListaComponent {
  agendamentoService: AgendamentoService;
  displayedColumns: string[] = ['nomeEvento', 'nomeUsuario', 'data', 'hora', 'acoes'];
  dataSource: MatTableDataSource<Agendamento> = new MatTableDataSource<Agendamento>([]);

  length?: number;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(private http: HttpClient) {
    this.agendamentoService = new AgendamentoService(http);
    this.loadTable();
  }

  loadTable(): void {
    this.agendamentoService.findAllPage().subscribe({
      next: (res: Page<Agendamento>) => {
        this.dataSource.data = res.docs;
      }
    });
  }

  setPage(page: PageEvent) {
    this.pageSize = page.pageSize;
    this.pageIndex = page.pageIndex;

    this.agendamentoService.findAllPage(this.pageSize, this.pageIndex + 1).subscribe({
      next: (res: Page<Agendamento>) => {
        this.dataSource.data = res.docs;
        this.length = res.totalDocs;
      }
    });
  }

  delete(id: string): void {
    if (confirm("Deseja realmente excluir esse cadastro?\nEssa ação não pode ser desfeita")) {
      this.agendamentoService.delete(id).subscribe({
        next: (res: Response) => {
          this.dataSource.data = this.dataSource.data.filter(x => x._id != id)
          alert(res.sucesso)
        },
        error: e => console.error(e)
      });
    }
  }
}
