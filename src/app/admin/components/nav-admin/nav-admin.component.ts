import {Component, EventEmitter, Output} from '@angular/core';
import {NavLink} from "../../../types/nav-link.type";
import {Router} from "@angular/router";
import {TokenService} from "../../../public/service/token.service";

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})

export class NavAdminComponent {

  @Output('routeClicked') onSelect = new EventEmitter<void>();

  links: NavLink[] = [
    {title: 'Home',icon: 'home',  path: '/admin/'},
    {title: 'Eventos',icon: 'date_range',  path: '/admin/evento/lista'},
    {title: 'Cardápios',icon: 'local_dining',  path: '/admin/item-cardapio/lista'},
    {title: 'Funcionários',icon: 'supervisor_account',  path: '/admin/funcionario/lista'},
    {title: 'Fornecedores',icon: 'local_shipping',  path: '/admin/fornecedor/lista'},
    {title: 'Usuários',icon: 'account_circle',  path: '/admin/usuario/lista'},
  ];

  constructor(private tokenService: TokenService, private route: Router) { }

  itemClicked() {
    this.onSelect.emit();
  }

  get isTokenPresent() {
    return this.tokenService.isTokenPresent();
  }

  logout() {
    this.route.navigateByUrl('/').then(ok => this.tokenService.removeTokens());
  }

}
