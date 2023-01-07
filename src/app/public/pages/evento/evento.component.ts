import {Component} from '@angular/core';
import {Evento} from "../../../types/evento.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {EventDialogComponent, EventoDTO} from "../../components/event-dialog/event-dialog.component";
import {TokenService} from "../../service/token.service";

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent {
  eventos!: Evento[];
  isLogged: boolean = false;
  idUser?: string;

  constructor(public dialog: MatDialog, private http: HttpClient, private tokenService: TokenService) {

    this.isLogged = tokenService.isTokenPresent();

    if(this.isLogged) {
      this.idUser = tokenService.getId();
    }

    this.http.get<Evento[]>(`${environment.api}/eventos/all`).subscribe({
      next: (res) => {
        this.eventos = res
      }
    });
  }

  montarObjeto(evento: Evento): EventoDTO {
    return {eventoId: evento._id!, usuarioId: this.idUser!};
  }
  openDialog(evento: EventoDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EventDialogComponent, {
      width: '250px',
      data: evento,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
