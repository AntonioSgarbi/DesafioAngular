import { Component } from '@angular/core';
import {NavLink} from "../../../types/nav-link.type";


export type CardObject = {
  model: string;
  icon: string;
  links: NavLink[];
}

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {

  public navLinks: CardObject[] = [
    {
      model: 'Eventos',
      icon: 'date_range',
      links: [
        {title: 'Eventos',icon: 'plus',  path: '/admin/evento/cadastro'},
        {title: 'Eventos',icon: 'list',  path: '/admin/evento/lista'}
      ]
    },
    {
      model: 'Bebidas',
      icon: 'local_bar',
      links: [
        {title: 'Cardápios',icon: 'plus',  path: '/admin/item-cardapio/bebidas/cadastro'},
        {title: 'Cardápios',icon: 'list',  path: '/admin/item-cardapio/lista'},
      ]
    },
    {
      model: 'Comidas',
      icon: 'local_dining',
      links: [
        {title: 'Eventos',icon: 'plus',  path: '/admin/item-cardapio/comida/cadastro'},
        {title: 'Eventos',icon: 'list',  path: '/admin/item-cardapio/lista'}
      ]
    },
    {
      model: 'Funcionários',
      icon: 'supervisor_account',
      links: [
        {title: 'Funcionários',icon: 'plus',  path: '/admin/funcionario/cadastro'},
        {title: 'Funcionários',icon: 'list',  path: '/admin/funcionario/lista'},
      ]
    },
    {
      model: 'Fornecedores',
      icon: 'local_shipping',
      links: [
        {title: 'Eventos', icon: 'plus', path: '/admin/fornecedor/cadastro'},
        {title: 'Eventos', icon: 'list', path: '/admin/fornecedor/lista'}
      ]
    },
    {
      model: 'Usuários',
      icon: 'account_circle',
      links: [
        {title: 'Eventos', icon: 'plus', path: '/admin/usuario/cadastro'},
        {title: 'Eventos', icon: 'list', path: '/admin/usuario/lista'}
      ]
    },
  ];


}
