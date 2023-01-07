import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminLayoutComponent} from "./pages/admin-layout/admin-layout.component";
import {EventoCadastroComponent} from "./pages/evento/cadastro/evento-cadastro.component";
import {EventoListaComponent} from "./pages/evento/lista/evento-lista.component";
import {FuncionarioListaComponent} from "./pages/funcionario/lista/funcionario-lista.component";
import {FuncionarioCadastroComponent} from "./pages/funcionario/cadastro/funcionario-cadastro.component";
import {NavAdminComponent} from "./components/nav-admin/nav-admin.component";
import {FornecedorListaComponent} from "./pages/fornecedor/lista/fornecedor-lista.component";
import {FornecedorCadastroComponent} from "./pages/fornecedor/cadastro/fornecedor-cadastro.component";
import {AgendamentoCadastroComponent} from "./pages/agendamento/cadastro/agendamento-cadastro.component";
import {AgendamentoListaComponent} from "./pages/agendamento/lista/agendamento-lista.component";
import {ItemCardapioListaComponent} from "./pages/item-cardapio/lista/item-cardapio-lista.component";
import {ItemCardapioCadastroComponent} from "./pages/item-cardapio/cadastro/item-cardapio-cadastro.component";
import {UsuarioListaComponent} from "./pages/usuario/lista/usuario-lista.component";
import {UsuarioCadastroComponent} from "./pages/usuario/cadastro/usuario-cadastro.component";
import {HomeAdminComponent} from "./pages/home-admin/home-admin.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import {NgxMaskDirective} from "ngx-mask";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AdminRoutingModule} from "./admin-routing.module";
import {AppModule} from "../app.module";
import {SearchBarComponent} from "../public/components/search-bar/search-bar.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {SearchBarModule} from "../public/components/search-bar/search-bar.module";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    EventoCadastroComponent,
    EventoListaComponent,
    FuncionarioListaComponent,
    FuncionarioCadastroComponent,
    NavAdminComponent,
    FornecedorListaComponent,
    FornecedorCadastroComponent,
    AgendamentoCadastroComponent,
    AgendamentoListaComponent,
    ItemCardapioListaComponent,
    ItemCardapioCadastroComponent,
    UsuarioListaComponent,
    UsuarioCadastroComponent,
    HomeAdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatNativeDateModule,
    NgxMaskDirective,
    MatCheckboxModule,
    MatAutocompleteModule,
    SearchBarModule
  ]
})
export class AdminModule { }
