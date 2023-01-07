import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Funcionario} from "../../../../types/funcionario.type";
import {FornecedorService} from "../../../service/fornecedor.service";
import {Fornecedor} from "../../../../types/fornecedor.type";

@Component({
  selector: 'app-cadastro',
  templateUrl: './fornecedor-cadastro.component.html',
  styleUrls: ['./fornecedor-cadastro.component.css']
})
export class FornecedorCadastroComponent {
  fornecedorService: FornecedorService;
  formGroup!: FormGroup;
  id?: string;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.fornecedorService = new FornecedorService(http);
    this.initForm();
    this.verifyPath();
  }

  initForm(): void {
    this.formGroup = new FormGroup<any>({
      nome: new FormControl('', Validators.required),

    })

    this.formGroup = this.fb.group({
      nome: ['', Validators.required],
      foto: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  verifyPath(): void {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id')!;

      this.fornecedorService.findById(this.id)
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

      this.fornecedorService.findAll().subscribe({
        next: (res) => {
          for(let f1 of res ) {

            let f: Fornecedor = {
              nome: `${f1.nome}`,
              foto: 'https://blog.allchem.com.br/wp-content/uploads/2018/08/como-achar-fornecedor-para-lojas-de-materiais-de-construcao.jpg',
              descricao: `${f1.descricao}`
            }

            this.fornecedorService.edit(f1._id!, f).subscribe({
              next: (r) => console.log(r.sucesso),
              error: e => alert(e)
            });
          }
        },
        error: (e) => {
          alert(e)
        }
      });


    if (this.formGroup.valid)
      if (this.id) {
        this.fornecedorService.edit(this.id, this.formGroup.value).subscribe({
          next: (res) => {
            alert(res.sucesso)
          },
          error: (e) => {
            alert(e)
          }
        });
      } else {
        this.fornecedorService.register(this.formGroup.value).subscribe({
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
