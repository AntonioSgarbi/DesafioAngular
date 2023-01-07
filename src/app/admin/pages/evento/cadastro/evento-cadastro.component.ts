import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EventoService} from "../../../service/evento.service";
import {Evento} from 'src/app/types/evento.type';

@Component({
  selector: 'app-cadastro',
  templateUrl: './evento-cadastro.component.html',
  styleUrls: ['./evento-cadastro.component.css'],
})
export class EventoCadastroComponent {
  eventoService: EventoService;
  formGroup!: FormGroup;
  id?: string;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.eventoService = new EventoService(http);
    this.initForm();
    this.verifyPath();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      nome: ['', Validators.required],
      foto: ['', Validators.required],
      descricao: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required]
    });
  }

  formatarData(data: string): string {
    return ''.concat(data.substring(8, 10)).concat('/').concat(data.substring(5, 7)).concat('/').concat(data.substring(0, 4));
  }

  verifyPath(): void {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id')!;

      this.eventoService.findById(this.id)
        .subscribe({
          next: (res: Evento) => {
            res.dataInicio = this.formatarData(res.dataInicio!)
            res.dataFim = this.formatarData(res.dataFim!)
            this.formGroup.patchValue(res);
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  submit() {
    let dataI: Date = this.formGroup.get('dataInicio')!.value;
    console.log(dataI)
    if (this.formGroup.valid) {
      this.id ? this.atualizarEvento() : this.cadastrarEvento();
    } else {
      alert('Preencha todos os campos requisitados!');
    }
  }

  cadastrarEvento(): void {
    this.eventoService.register(this.formGroup.value).subscribe({
      next: (res) => {
        if (confirm(`${res.sucesso}\n\nDeseja cadastrar outro?'`))
          this.formGroup.reset();
        else
          this.router.navigateByUrl('/admin/evento/lista');
      },
      error: (e) => {
        alert(e.erro)
      }
    });
  }

  atualizarEvento(): void {
    this.eventoService.edit(this.id!, this.formGroup.value).subscribe({
      next: (res) => {
        alert(res.sucesso)
      },
      error: (e) => {
        alert(e.erro)
      }
    });
  }

  getTextButton(): string {
    return this.id ? 'Editar' : 'Salvar';
  }

}
