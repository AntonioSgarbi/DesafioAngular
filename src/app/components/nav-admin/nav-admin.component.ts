import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavLink} from "../../types/nav-link.type";

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})

export class NavAdminComponent implements OnInit {
  @Output('routeClicked') onSelect = new EventEmitter<void>();


  links: NavLink[] = [
    {title: 'Home',icon: 'home',  path: '/admin/home'},
    {title: 'Funcionários',icon: 'supervisor_account',  path: '/admin/funcionario/lista'},
    {title: 'Fornecedores',icon: 'local_shipping',  path: '/admin/fornecedor/lista'},
    {title: 'Cardápio',icon: 'local_dining',  path: '/admin/item-cardapio/lista'},
    {title: 'Eventos',icon: 'date_range',  path: '/admin/evento/lista'},
    {title: 'Usuário',icon: 'account_circle',  path: '/home'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  itemClicked() {
    this.onSelect.emit();
  }
}
