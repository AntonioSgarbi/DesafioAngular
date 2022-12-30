import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/user/home/home.component";
import {PublicLayoutComponent} from "./pages/user/public-layout/public-layout.component";
import {AdminLayoutComponent} from "./pages/admin/admin-layout/admin-layout.component";
import {EventoCadastroComponent} from "./pages/admin/evento/cadastro/evento-cadastro.component";
import {FuncionarioListaComponent} from "./pages/admin/funcionario/lista/funcionario-lista.component";
import {EventoListaComponent} from "./pages/admin/evento/lista/evento-lista.component";
import {LoginComponent} from "./pages/login/login.component";
import {FornecedorCadastroComponent} from "./pages/admin/fornecedor/cadastro/fornecedor-cadastro.component";
import {FornecedorListaComponent} from "./pages/admin/fornecedor/lista/fornecedor-lista.component";
import {UserGuard} from "./guard/user.guard";
import {AdminGuard} from "./guard/admin.guard";
import {FuncionarioCadastroComponent} from "./pages/admin/funcionario/cadastro/funcionario-cadastro.component";
import {ItemCardapioCadastroComponent} from "./pages/admin/item-cardapio/cadastro/item-cardapio-cadastro.component";
import {ItemCardapioListaComponent} from "./pages/admin/item-cardapio/lista/item-cardapio-lista.component";

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {path: '', component: HomeComponent},
  {
    path: 'user', component: PublicLayoutComponent, canActivate: [UserGuard], children: [
      {path: '', redirectTo: 'evento', pathMatch: 'full'}
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, canActivate: [AdminGuard], children: [
      {path: '', redirectTo: 'evento/lista', pathMatch: 'full'},
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
          {path: 'lista', component: EventoListaComponent}
        ]
      },

    ]
  },
  {path: "**", redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
