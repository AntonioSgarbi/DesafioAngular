import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AgendamentoService} from "../../../service/agendamento.service";
import {Agendamento} from "../../../../types/agendamento.type";

@Component({
  selector: 'app-cadastro',
  templateUrl: './agendamento-cadastro.component.html',
  styleUrls: ['./agendamento-cadastro.component.css']
})
export class AgendamentoCadastroComponent {

  agendamentoService: AgendamentoService;
  formGroup!: FormGroup;
  id?: string;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.agendamentoService = new AgendamentoService(http);
    this.initForm();
    this.verifyPath();
  }

  initForm(): void {
    this.formGroup = new FormGroup<any>({
      nome: new FormControl('', Validators.required),

    })

    this.formGroup = this.fb.group({
      nomeUsuario: [{value: '', disabled: true}, Validators.required],
      nomeEvento: [{value: '', disabled: true}, Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  formatarData(data: string): string {
    return ''.concat(data.substring(8, 10)).concat('/').concat(data.substring(5, 7)).concat('/').concat(data.substring(0, 4));
  }

  verifyPath(): void {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id')!;

      this.agendamentoService.findById(this.id)
        .subscribe({
          next: (res: Agendamento) => {
            console.log(res)
            res.data = this.formatarData(res.data as string)
            this.formGroup.patchValue(res);
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  submit() {

    if (this.formGroup.valid)
      if (this.id) {
        this.agendamentoService.edit(this.id, this.formGroup.value).subscribe({
          next: (res) => {
            alert(res.sucesso)
          },
          error: (e) => {
            alert(e)
          }
        });
      } else {
        this.agendamentoService.register(this.formGroup.value).subscribe({
          next: (res) => {
            if (confirm(`${res.sucesso}\n\nDeseja cadastrar outro?'`))
              this.formGroup.reset();
            else
              this.router.navigateByUrl('/admin/fornecedor/lista');
          },
          error: (e) => {
            alert(e)
          }
        });
      }
    else alert('Preencha todos os campos requisitados!');
  }

  getTextButton(): string {
    return this.id ? 'Editar' : 'Salvar';
  }

}
