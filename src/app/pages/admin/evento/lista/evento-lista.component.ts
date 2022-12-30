import { Component, OnInit } from '@angular/core';
import {FornecedorService} from "../../../../service/fornecedor.service";
import {MatTableDataSource} from "@angular/material/table";
import {Fornecedor} from "../../../../types/fornecedor.type";
import {HttpClient} from "@angular/common/http";
import {Response} from "../../../../types/response.type";
import {EventoService} from "../../../../service/evento.service";
import {Evento} from "../../../../types/evento.type";

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.css']
})
export class EventoListaComponent {
  eventoService: EventoService;
  displayedColumns: string[] = ['foto', 'nome', 'descricao', 'dataInicio', 'horaInicio', 'dataFim', 'horaFim', 'acoes'];
  dataSource: MatTableDataSource<Evento> = new MatTableDataSource<Evento>([]);

  constructor(private http: HttpClient) {
    this.eventoService = new EventoService(http);
    this.loadTable();
  }

  loadTable(): void {
    this.eventoService.findAll().subscribe({
      next: (res: Evento[]) => {
        this.dataSource.data = res;
        console.log(res)
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
