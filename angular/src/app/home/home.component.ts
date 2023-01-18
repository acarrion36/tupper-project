import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  // Variables
  public loginStatus$:any
  public alertInfo$:any

  // Constructor | _loginService: Controla si esta logueado
  constructor(private _loginService:LoginService) {}

  // OnInit | Checkeo del estado de la sesión de usuario
  ngOnInit(): void {
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    this._loginService.alertInfoStatus$.subscribe((status:boolean) => this.alertInfo$ = status)
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

  accessControl():void {
    this._loginService.readUserLogged("token").subscribe({
      next : data => {
        if(data!=0) {
          // Controlar si no esta rellenados direccion y CP
          if(data[0].direccion!='' && data[0].cp!=null){ // Si estan rellenados
            this._loginService.setalertInfoStatus(false)
            this._loginService.setToken("info",btoa(this.alertInfo$))
          } else {
            this._loginService.setalertInfoStatus(true)
          }
        }
      }
    })
  }

}
