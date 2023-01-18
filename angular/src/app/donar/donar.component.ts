import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DonarService } from '../services/donar.service';
import { CookieService } from 'ngx-cookie-service';

declare var bootstrap:any;

@Component({
  selector: 'app-donar',
  templateUrl: './donar.component.html',
  styleUrls: ['./donar.component.scss']
})

export class DonarComponent implements OnInit {

  // Variables | Login Status
  public loginStatus$:any
  public alertInfo$:any
  public idUsuario:any

  constructor(private _loginService:LoginService, private _donarService:DonarService, private router:Router, private _cookie:CookieService) { }

  ngOnInit(): void {
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    this._loginService.alertInfoStatus$.subscribe((status:boolean) => this.alertInfo$ = status)
    this.authGuard()
    this.readUserLogged()
    this.tooltipInit()
  }

  // Leer los datos del usuario logeado
  readUserLogged():void {
    this._loginService.readUserLogged("token").subscribe({
      next : data => {
        if(data!=0) {
          this.idUsuario=data[0].id_usuario
          // Controlar el mensaje de alerta si no esta rellenados direccion y CP
          if(data[0].direccion!='' && data[0].cp!=null){ // Si estan rellenados
            this._loginService.setalertInfoStatus(false)
          } else {
            this._loginService.setalertInfoStatus(true)
          }
        }
      }
    })
  }

  // Inicializr bootstrap tooltip
  tooltipInit():void {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }

  // Si no esta logueado, redirigimos a la home y mostramos la ventana de login
  authGuard():void {
    if(!this._cookie.check("token")) {
      this.router.navigate(['/'])
      this._loginService.setloginWindowStatus(true)
    } else if (this._cookie.check("token") && !this._cookie.check("info")) {
      this.router.navigate(['/perfil'])
    }
  }

}
