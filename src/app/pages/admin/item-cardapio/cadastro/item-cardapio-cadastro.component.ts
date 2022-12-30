import { Component, OnInit } from '@angular/core';
import {FornecedorService} from "../../../../service/fornecedor.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Funcionario} from "../../../../types/funcionario.type";
import {ItemCardapioService} from "../../../../service/item-cardapio.service";
import {ItemCardapio} from "../../../../types/item-cardapio.type";

@Component({
  selector: 'app-cadastro',
  templateUrl: './item-cardapio-cadastro.component.html',
  styleUrls: ['./item-cardapio-cadastro.component.css']
})
export class ItemCardapioCadastroComponent {
  itemCardapioService: ItemCardapioService;
  formGroup!: FormGroup;
  id?: string;
  type!: string;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.itemCardapioService = new ItemCardapioService(http);
    this.initForm();
    this.verifyPath();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      nome: ['', Validators.required],
      foto: ['', Validators.required],
      preco: [null, Validators.required],
      descricao: ['', Validators.required]
    });
  }

  verifyPath(): void {
    this.type = this.activatedRoute.snapshot.paramMap.get('tipo')!;

    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id')!;

      this.itemCardapioService.findById(this.id, this.type)
        .subscribe({
          next: (res: ItemCardapio) => {
            this.formGroup.patchValue(res);
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  submit(): void {
    if (this.formGroup.valid)
      if (this.id) {
        this.itemCardapioService.edit(this.id, this.formGroup.value, this.type).subscribe({
          next: (res) => {
            alert(res.sucesso)
          },
          error: (e) => {
            alert(e)
          }
        });
      } else {
        this.itemCardapioService.register(this.formGroup.value, this.type).subscribe({
          next: (res) => {
            if (confirm(`${res.sucesso}\n\nDeseja cadastrar outro?'`))
              this.formGroup.reset();
            else
              this.router.navigateByUrl('/admin/item-cardapio/lista');
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
