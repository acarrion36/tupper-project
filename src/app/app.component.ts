import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  // Variables
  public loginWindowStatus$=this._loginService.loginWindowStatus$

  // Constructor | _loginService: Controla si esta logueado | router: Navegación
  constructor(private _loginService:LoginService, private router: Router, private _cookies:CookieService) { }

  // OnInit | Scroll to top por defecto y checkeo del estado de la sesión de usuario
  ngOnInit():void {
    // Scroll a la parte superior de la página al navegar a una ruta nueva
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
