import { Component, OnInit } from '@angular/core';
import {NavLink} from "../../types/nav-link.type";

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css']
})
export class NavUserComponent implements OnInit {

  links: NavLink[] = [
    {title: 'Home',icon: 'home',  path: '/user/home'},
    {title: 'Sobre',icon: 'supervisor_account',  path: '/user/sobre'},
    {title: 'Cardápio',icon: 'local_dining',  path: '/home/evento/lista'},
    {title: 'Eventos',icon: 'date_range',  path: '/home/evento/lista'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
