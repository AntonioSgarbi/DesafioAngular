import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {PublicLayoutComponent} from "./public/pages/public-layout/public-layout.component";
import {AdminLayoutComponent} from "./admin/pages/admin-layout/admin-layout.component";
import {LoginComponent} from "./public/pages/login/login.component";
import {AdminGuard} from "./guard/admin.guard";
import {CardapioComponent} from "./public/pages/cardapio/cardapio.component";
import {EventoComponent} from "./public/pages/evento/evento.component";

const routes: Routes = [
  {
    path: '', component: PublicLayoutComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'cardapio', component: CardapioComponent},
      {path: 'evento', component: EventoComponent},
      {path: 'login', component: LoginComponent},
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, canLoad: [AdminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {path: "**", redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
