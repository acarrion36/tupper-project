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
  public perfilNombre:string=""
  public perfilApellido1:string=""
  public perfilApellido2:string=""
  public perfilDireccion:string=""
  public perfilNickname:string=""
  public perfilMail:string=""
  public perfilFoto:string=""
  public loginStatus$:any
  public alertInfo$:any
  public saveInfPerBtn:boolean=false
  public saveCnfPerBtn:boolean=false
  public userData:any

  // Constructor | _loginService: Controla si esta logueado | router: Navegación
  constructor(private _loginService:LoginService, private router:Router) {}

  // OnInit
  ngOnInit():void {
    // Suscripción a loginService | Escuchamos el estado de la información personal
    this._loginService.alertInfoStatus$.subscribe((status:boolean) => this.alertInfo$ = status)
    // Leer los datos del usuario logeado
    this.readUserLogged()
    // Inicializr bootstrap tooltip
    this.tooltipInit()
    // Si no esta logueado, redirigimos a la home y mostramos la ventana de login
    this.authGuard()
    // Comprobar si la información personal esta completa
    this.checkInfo()
  }

  readUserLogged():void {
    this._loginService.readUserLogged().subscribe({
      next : data => {
        this.userData=data
        this.perfilNombre=data[0].nombre
        this.perfilApellido1=data[0].apellido1
        this.perfilApellido2=data[0].apellido2
        this.perfilDireccion=data[0].direccion
        this.perfilNickname=data[0].nombre_usuario
        this.perfilMail=data[0].email
      },
      error : error => {
        console.log("Read error", error);
      }
    });
  }

  tooltipInit():void {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }

  authGuard():void {
    this.loginStatus$=this._loginService.getLoginStatus()
    if(!this._loginService.getLoginStatus() || !this._loginService.getToken()) {
      this.router.navigate(['/'])
      this._loginService.setloginWindowStatus(true)
    }
  }

  checkInfo():void {
    if(this.perfilNombre && this.perfilApellido1 && this.perfilApellido2 && this.perfilDireccion){
      this._loginService.setalertInfoStatus(false)
    }
  }

  // Validar y guardar información personal **FALTA VALIDAR CAMPOS**
  saveInfPer():void {
    this._loginService.setalertInfoStatus(false)
  }

  // Validar y guardar configuración de perfil **FALTA VALIDAR CAMPOS**
  saveCnfPer():void {
  }

  // Controlar cambios en el formulario Información personal
  changeInfPerBtn():void {
    if(this.perfilNombre!=this.userData[0].nombre || this.perfilApellido1!=this.userData[0].apellido1 || this.perfilApellido2!=this.userData[0].apellido2 || this.perfilDireccion!=this.userData[0].direccion){
      this.saveInfPerBtn=true
    } else {
      this.saveInfPerBtn=false
    }
  }

  // Controlar cambios en el formulario Configurar perfil
  changeCnfPerBtn():void {
    if(this.perfilNickname!=this.userData[0].nombre_usuario){
      this.saveCnfPerBtn=true
    } else {
      this.saveCnfPerBtn=false
    }
  }

}
