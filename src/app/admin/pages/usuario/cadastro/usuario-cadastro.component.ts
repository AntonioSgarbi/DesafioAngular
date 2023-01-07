import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UsuarioService} from "../../../service/usuario.service";
import {Usuario} from "../../../../types/usuario.type";
import {Response} from "../../../../types/response.type";

@Component({
  selector: 'app-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent {
  usuarioService: UsuarioService;
  formGroup!: FormGroup;
  id?: string;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.usuarioService = new UsuarioService(http);
    this.initForm();
    this.verifyPath();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      nome: ['', Validators.required],
      isAdmin: [false, Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  verifyPath(): void {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id')!;

      this.usuarioService.findById(this.id)
        .subscribe({
          next: (res: Usuario) => {
            res.senha = '';
            this.formGroup.patchValue(res);
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  submit() {
    console.log(this.formGroup.get('isAdmin')!.value)
    if (this.formGroup.valid)
      if (this.id) {
        this.usuarioService.edit(this.id, this.formGroup.value).subscribe({
          next: (res: Response) => {
            alert(res.sucesso)
          },
          error: (e) => {
            alert(e)
          }
        });
      } else {
        this.usuarioService.register(this.formGroup.value).subscribe({
          next: (res: Response) => {
            if (confirm(`${res.sucesso}\n\nDeseja cadastrar outro?'`))
              this.formGroup.reset();
            else
              this.router.navigateByUrl('/admin/usuario/lista');
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
