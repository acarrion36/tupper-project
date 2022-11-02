import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

declare var bootstrap:any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit {

  // Variables
  public perfilNombre:string="Pedro"
  public perfilApellidos:string="Pardo"
  public perfilDireccion:string=""
  public perfilTelefono:string=""
  public perfilNickname:string=""
  public perfilMail:string="ppardo@birt.eus"
  public perfilFoto:string=""
  public loginStatus$:any
  public personalInfoStatus$:any

  // Constructor | _loginService: Controla si esta logueado | router: Navegación
  constructor(private _loginService:LoginService, private router:Router) {}

  // OnInit
  ngOnInit():void {
    // Inicializr bootstrap tooltip
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    // Suscripción a loginService | Escuchamos el estado del login y si ha rellenado la informacion personal obligatoria
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    this._loginService.personalInfoStatus$.subscribe((status:boolean) => this.personalInfoStatus$ = status)
    // Si no esta logueado, redirigimos a la home y moestramos ventana de login
    if(!this.loginStatus$) {
      this.router.navigate(['/'])
      this._loginService.setloginWindowStatus(true)
    }
  }

  // Validar y guardar información personal **FALTA VALIDAR CAMPOS**
  saveInfPer():void {
    this.personalInfoStatus$=true
    this._loginService.setpersonalInfoStatus(true)
  }

  // Validar y guardar configuración de perfil **FALTA VALIDAR CAMPOS**
  saveConfPer():void {
  }

}
