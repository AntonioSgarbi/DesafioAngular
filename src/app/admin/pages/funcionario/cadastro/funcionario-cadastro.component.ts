import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FuncionarioService} from "../../../service/funcionario.service";
import {HttpClient} from "@angular/common/http";
import {Funcionario} from "../../../../types/funcionario.type";

@Component({
  selector: 'app-funcionario-cadastro',
  templateUrl: './funcionario-cadastro.component.html',
  styleUrls: ['./funcionario-cadastro.component.css']
})
export class FuncionarioCadastroComponent {
  funcionarioService: FuncionarioService;
  formGroup!: FormGroup;
  id?: string;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.funcionarioService = new FuncionarioService(http);
    this.initForm();
    this.verifyPath();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      nome: ['', Validators.required],
      foto: ['', Validators.required],
      idade: [null, Validators.required],
      cargo: ['', Validators.required],
      naturalidade: ['', Validators.required],
      anoAdmissao: ['', [Validators.required, Validators.min(2000), Validators.max(2030)]],
      hobbie: ['', Validators.required],
    });
  }

  verifyPath(): void {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id')!;

      this.funcionarioService.findById(this.id)
        .subscribe({
          next: (res: Funcionario) => {
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
        this.funcionarioService.edit(this.id, this.formGroup.value).subscribe({
          next: (res) => {
            alert(res.sucesso);
          },
          error: (e) => {
            alert(e);
          }
        });
      } else {
        this.funcionarioService.register(this.formGroup.value).subscribe({
          next: (res) => {
            if (confirm(`${res.sucesso}\n\nDeseja cadastrar outro?'`))
              this.formGroup.reset();
            else
              this.router.navigateByUrl('/admin/funcionario/lista');
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
