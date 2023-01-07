import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Agendamento} from "../../../types/agendamento.type";
import {Router} from "@angular/router";

export type EventoDTO = {
  eventoId: string,
  usuarioId: string
}

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css'],
})
export class EventDialogComponent {
  dataAgendamento?: string;
  horaAgendamento?: string;
  idRegistrado?: string;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dto: EventoDTO,
    private http: HttpClient) {

    http.get<Agendamento[]>(`${environment.api}/agendamentos/usuario/${dto.usuarioId}`).subscribe({
      next: res => {
        res.filter(agenda => {
          if (agenda.idEvento === dto.eventoId && agenda.idUsuario === dto.usuarioId) {
            this.idRegistrado = agenda._id;
            this.dataAgendamento = this.formatarData(agenda.data!.toString());
            this.horaAgendamento = agenda.hora
          }
        });
      }
    });
  }

  formatarData(data: string): string {
    return ''.concat(data.substring(8, 10)).concat('/').concat(data.substring(5, 7)).concat('/').concat(data.substring(0, 4));
  }

  salvar() {
    let agendamento: Agendamento = {
      idUsuario: this.dto.usuarioId,
      idEvento: this.dto.eventoId,
      data: this.dataAgendamento,
      hora: this.horaAgendamento
    }
    this.idRegistrado ? this.atualizarAgendamento(agendamento) : this.cadastrarAgendamento(agendamento);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cadastrarAgendamento(agendamento: Agendamento): void {
    this.http.put<any>(`${environment.api}/agendamentos/${this.idRegistrado}`, agendamento).subscribe({
      next: res => {
        this.dialogRef.close();
        alert('Reserva atualizada com sucesso!');
      }
    });
  }

  atualizarAgendamento(agendamento: Agendamento): void {
    this.http.post<any>(`${environment.api}/agendamentos`, agendamento).subscribe({
      next: res => {
        this.dialogRef.close();
        alert('Reserva criada com sucesso!');
      }
    });
  }

}
