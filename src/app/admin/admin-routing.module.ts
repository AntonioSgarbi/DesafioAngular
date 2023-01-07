import {RouterModule, Routes} from "@angular/router";
import {HomeAdminComponent} from "./pages/home-admin/home-admin.component";
import {ItemCardapioCadastroComponent} from "./pages/item-cardapio/cadastro/item-cardapio-cadastro.component";
import {ItemCardapioListaComponent} from "./pages/item-cardapio/lista/item-cardapio-lista.component";
import {FuncionarioCadastroComponent} from "./pages/funcionario/cadastro/funcionario-cadastro.component";
import {FuncionarioListaComponent} from "./pages/funcionario/lista/funcionario-lista.component";
import {FornecedorCadastroComponent} from "./pages/fornecedor/cadastro/fornecedor-cadastro.component";
import {FornecedorListaComponent} from "./pages/fornecedor/lista/fornecedor-lista.component";
import {EventoCadastroComponent} from "./pages/evento/cadastro/evento-cadastro.component";
import {EventoListaComponent} from "./pages/evento/lista/evento-lista.component";
import {UsuarioCadastroComponent} from "./pages/usuario/cadastro/usuario-cadastro.component";
import {UsuarioListaComponent} from "./pages/usuario/lista/usuario-lista.component";
import {NgModule} from "@angular/core";
import {AgendamentoCadastroComponent} from "./pages/agendamento/cadastro/agendamento-cadastro.component";
import {AgendamentoListaComponent} from "./pages/agendamento/lista/agendamento-lista.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeAdminComponent},
  {
    path: 'item-cardapio', children: [
      {path: ':tipo/cadastro', component: ItemCardapioCadastroComponent},
      {path: ':tipo/cadastro/:id', component: ItemCardapioCadastroComponent},
      {path: 'lista', component: ItemCardapioListaComponent}
    ]
  },
  {
    path: 'funcionario', children: [
      {path: 'cadastro', component: FuncionarioCadastroComponent},
      {path: 'cadastro/:id', component: FuncionarioCadastroComponent},
      {path: 'lista', component: FuncionarioListaComponent}
    ]
  },
  {
    path: 'agendamento', children: [
      {path: 'cadastro', component: AgendamentoCadastroComponent},
      {path: 'cadastro/:id', component: AgendamentoCadastroComponent},
      {path: 'lista', component: AgendamentoListaComponent}
    ]
  },
  {
    path: 'fornecedor', children: [
      {path: 'cadastro', component: FornecedorCadastroComponent},
      {path: 'cadastro/:id', component: FornecedorCadastroComponent},
      {path: 'lista', component: FornecedorListaComponent}
    ]
  },
  {
    path: 'evento', children: [
      {path: 'cadastro', component: EventoCadastroComponent},
      {path: 'cadastro/:id', component: EventoCadastroComponent},
      {path: 'lista', component: EventoListaComponent},
      {path: 'lista', component: EventoListaComponent}
    ]
  },
  {
    path: 'usuario', children: [
      {path: 'cadastro', component: UsuarioCadastroComponent},
      {path: 'cadastro/:id', component: UsuarioCadastroComponent},
      {path: 'lista', component: UsuarioListaComponent}
    ]
  },
  {
    path: '**', redirectTo: ''
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
