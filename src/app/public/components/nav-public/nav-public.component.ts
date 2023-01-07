import {Component, EventEmitter, Output} from '@angular/core';
import {NavLink} from "../../../types/nav-link.type";
import {TokenService} from "../../service/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-public',
  templateUrl: './nav-public.component.html',
  styleUrls: ['./nav-public.component.css']
})
export class NavPublicComponent {

  @Output('routeClicked') onSelect = new EventEmitter<void>();

  links: NavLink[] = [
    {title: 'Home',icon: 'home',  path: ''},
    {title: 'Cardápio',icon: 'local_dining',  path: '/cardapio'},
    {title: 'Eventos',icon: 'date_range',  path: '/evento'}
  ];

  constructor(private tokenService: TokenService, private route: Router) {  }

  itemClicked() {
    this.onSelect.emit();
  }

  get isTokenPresent() {
    return this.tokenService.isTokenPresent();
  }

  get isAdmin() {
    return this.tokenService.isAdmin();
  }

  logout() {
    this.tokenService.removeTokens();
  }

  login() {
    this.onSelect.emit();
    this.route.navigateByUrl('/login');
  }

  goPanel() {
    this.route.navigateByUrl('/admin')
  }






}
