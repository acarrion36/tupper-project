import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {

  // Constructor | _loginService: Controla si esta logueado | router: Navegación | _cookie: Trabajar con Cookies
  constructor(private _loginService:LoginService, public router: Router, private _cookie:CookieService) {}

  ngOnInit(): void {}

  // Cerrar sesión de usuario | Seteamos el componente logout a false, borramos cookies y redirigimos a la página de inicio
  cerrarSesion():void {
    this._loginService.setlogoutWindowStatus(false)
    this._cookie.delete("token");
    this._cookie.delete("loginStatus")
    this.router.navigate(['/'])
  }

}
