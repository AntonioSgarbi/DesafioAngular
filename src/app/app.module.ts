import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/user/home/home.component';
import { PublicLayoutComponent } from './pages/user/public-layout/public-layout.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { EventoCadastroComponent } from './pages/admin/evento/cadastro/evento-cadastro.component';
import { EventoListaComponent } from './pages/admin/evento/lista/evento-lista.component';
import { FuncionarioListaComponent } from './pages/admin/funcionario/lista/funcionario-lista.component';
import { FuncionarioCadastroComponent } from './pages/admin/funcionario/cadastro/funcionario-cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { FornecedorListaComponent } from './pages/admin/fornecedor/lista/fornecedor-lista.component';
import { FornecedorCadastroComponent } from './pages/admin/fornecedor/cadastro/fornecedor-cadastro.component';
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AgendamentoCadastroComponent } from './pages/admin/agendamento/agendamento-cadastro/agendamento-cadastro.component';
import { AgendamentoListaComponent } from './pages/admin/agendamento/agendamento-lista/agendamento-lista.component';
import { ItemCardapioListaComponent } from './pages/admin/item-cardapio/lista/item-cardapio-lista.component';
import { ItemCardapioCadastroComponent } from './pages/admin/item-cardapio/cadastro/item-cardapio-cadastro.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask} from "ngx-mask";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicLayoutComponent,
    AdminLayoutComponent,
    EventoCadastroComponent,
    EventoListaComponent,
    FuncionarioListaComponent,
    FuncionarioCadastroComponent,
    LoginComponent,
    NavAdminComponent,
    NavUserComponent,
    FornecedorListaComponent,
    FornecedorCadastroComponent,
    AgendamentoCadastroComponent,
    AgendamentoListaComponent,
    ItemCardapioListaComponent,
    ItemCardapioCadastroComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
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
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaskDirective,
        NgxMaskPipe
    ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
      // useValue: 'en-GB'
    },
    provideEnvironmentNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
