import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {

  // Constructor | router: Navegación | _cookie: Trabajar con Cookies | _loginService: Estado de login
  constructor(public router: Router, private _cookie:CookieService, private _loginService:LoginService, ) {}

  ngOnInit():void {}

  // Cerrar sesión de usuario | Borramos cookies y redirigimos a la página de inicio
  cerrarSesion():void {
    this._cookie.delete("token");
    this._cookie.delete("info");
    this.router.navigate(['/'])
    this._loginService.setloginStatus(false)
  }

}
