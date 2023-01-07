import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './public/pages/home/home.component';
import {PublicLayoutComponent} from './public/pages/public-layout/public-layout.component';
import {LoginComponent} from './public/pages/login/login.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NavPublicComponent} from './public/components/nav-public/nav-public.component';
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask} from "ngx-mask";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CardapioComponent} from './public/pages/cardapio/cardapio.component';
import {EventoComponent} from './public/pages/evento/evento.component';
import {LoaderComponent} from "./public/components/loader/loader.component";
import {LoaderInterceptor} from "./interceptor/loader.interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {EventDialogComponent} from './public/components/event-dialog/event-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {SearchBarComponent} from "./public/components/search-bar/search-bar.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {SearchBarModule} from "./public/components/search-bar/search-bar.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicLayoutComponent,
    LoginComponent,
    NavPublicComponent,
    CardapioComponent,
    EventoComponent,
    LoaderComponent,
    EventDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
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
    NgxMaskPipe,
    MatCheckboxModule,
    MatDialogModule,
    MatAutocompleteModule,
    SearchBarModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'BR'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideEnvironmentNgxMask({
      dropSpecialCharacters: false
    })
  ],
  exports: [
    SearchBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
