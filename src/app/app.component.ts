import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  // Variables
  public loginWindowStatus$:any

  // Constructor | _loginService: Controla si esta logueado | router: Navegación
  constructor(private _loginService:LoginService, private router: Router, private _cookies:CookieService) { }

  // OnInit | Checkeo del estado de la sesión de usuario, scroll to top por defecto al cambiar de vista y checkeo de cookies
  ngOnInit():void {
    this._loginService.loginWindowStatus$.subscribe((status:boolean) => this.loginWindowStatus$ = status)
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
    if(this._cookies.check("token")) {
      this._loginService.setloginStatus(true)
    }
  }

}
