import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Funcionario} from "../../../../types/funcionario.type";
import {HttpClient} from "@angular/common/http";
import {FuncionarioService} from "../../../../service/funcionario.service";
import {Response} from "../../../../types/response.type";

@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.css']
})
export class FuncionarioListaComponent {
  funcionarioService: FuncionarioService;
  displayedColumns: string[] = ['foto', 'nome', 'idade', 'cargo', 'naturalidade', 'Ano Admissao', 'acoes'];
  dataSource: MatTableDataSource<Funcionario> = new MatTableDataSource<Funcionario>([]);

  constructor(private http: HttpClient) {
    this.funcionarioService = new FuncionarioService(http);
    this.loadTable();
  }

  loadTable(): void {
    this.funcionarioService.findAll().subscribe({
      next: (res: Funcionario[]) => {
        this.dataSource.data = res;
        console.log(res)
      }
    });
  }

  delete(id: string): void {
    if (confirm("Deseja realmente excluir esse cadastro?\nEssa ação não pode ser desfeita")) {
      this.funcionarioService.delete(id).subscribe({
        next: (res: Response) => {
          this.dataSource.data = this.dataSource.data.filter(x => x._id !== id)
          alert(res.sucesso)
        }
      });
    }
  }

}
