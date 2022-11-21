import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  // Variables
  public loginStatus$:any

  // Constructor | _loginService: Controla si esta logueado
  constructor(private _loginService:LoginService) {}

  // OnInit | Checkeo del estado de la sesión de usuario
  ngOnInit(): void {
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
  }

  // Metodo | Mostrar el componente de login
  mostrar():void {
    if(this.loginStatus$) {
      this._loginService.setloginWindowStatus(false)
      this._loginService.setlogoutWindowStatus(true)
    } else {
      this._loginService.setlogoutWindowStatus(false)
      this._loginService.setloginWindowStatus(true)
    }
  }

}
