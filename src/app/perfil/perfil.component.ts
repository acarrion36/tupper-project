import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/User';

declare var bootstrap:any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit {

  // Variables | Modelo User
  public updateUser:User = new User('','','','','','','','')
  public userData:any
  public userName:any
  public loginStatus$:any
  public alertInfo$:any

  // Variables | Información personal
  public perfilNombre:string=""
  public perfilApellido1:string=""
  public perfilApellido2:string=""
  public perfilDireccion:string=""
  public perfilCP:any
  public alertDireccion:boolean=false
  public alertCP:boolean=false
  public alertMsg:string=""
  public infPerBtn:boolean=false
  public infPerChecked:boolean=false

  // Variables | Configurar perfil
  public perfilNickname:string=""
  public perfilMail:string=""
  public perfilFoto:string=""
  public cnfPerBtn:boolean=false
  public cnfPerChecked:boolean=false

  // Constructor | _loginService: Controla si esta logueado | router: Navegación | _cookie: Trabajar con cookies
  constructor(private _loginService:LoginService, private router:Router, private _cookie:CookieService) {}

  // OnInit
  ngOnInit():void {
    // Suscripción a loginService | Escuchamos el estado de login y de la información personal
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    this._loginService.alertInfoStatus$.subscribe((status:boolean) => this.alertInfo$ = status)
    // Llamadas a metodos
    this.readUserLogged()
    this.tooltipInit()
    this.authGuard()
    this.visibleNickname()
  }

  // Leer los datos del usuario logeado
  readUserLogged():void {
    this._loginService.readUserLogged().subscribe({
      next : data => {
        this.userData=data
        // Rellenar los input
        this.perfilNombre=data[0].nombre
        this.perfilApellido1=data[0].apellido1
        this.perfilApellido2=data[0].apellido2
        this.perfilDireccion=data[0].direccion
        this.perfilNickname=data[0].nombre_usuario
        this.perfilMail=data[0].email
        if(data[0].cp==0){
          this.perfilCP=null
        } else {
          this.perfilCP="0"+data[0].cp
        }
        if(data[0].nombre_usuario) {
          this.userName=data[0].nombre_usuario
        } else {
          this.userName=data[0].nombre
        }
        // Controlar el mensaje de alerta si no esta rellenados direccion y CP
        if(data[0].direccion!='' && data[0].cp!=null){
          this._loginService.setalertInfoStatus(false)
        } else {
          this.alertInfo$=true
        }
      },
      error : error => {
        console.log("Read error", error);
      }
    });
  }

  // Inicializr bootstrap tooltip
  tooltipInit():void {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }

  // Controlar nombre de usuario público
  visibleNickname():void{
    if(!this.perfilNickname) {
      this.userName=this.userData[0].nombre
    } else {
      this.userName=this.perfilNickname
    }
  }

  // Si no esta logueado, redirigimos a la home y mostramos la ventana de login
  authGuard():void {
    if(!this._cookie.check("token")) {
      this.router.navigate(['/'])
      this._loginService.setloginWindowStatus(true)
    }
  }

  // Validar y guardar información personal
  saveInfPer():void {
    if(!this.perfilDireccion) {
      this.alertDireccion=true
    } else {
      this.alertDireccion=false
    }
    if(!this.perfilCP) {
      this.alertCP=true
      this.alertMsg="Campo obligatorio."
    } else if(!this.checkCP(this.perfilCP)) {
      this.alertCP=true
      this.alertMsg="Formato incorrecto."
    } else {
      this.alertCP=false
    }
    if(!this.alertDireccion && !this.alertCP){
      this._loginService.update(this.userData[0].id_usuario,new User(this.perfilApellido1,this.perfilApellido2,this.perfilCP,this.perfilDireccion,this.perfilMail,this.perfilNombre,this.perfilNickname,this.userData[0].pass)).subscribe()
      this._loginService.setalertInfoStatus(false)
      this.infPerChecked=true
      this.infPerBtn=false
    }
  }

  // Validar y guardar configuración de perfil
  saveCnfPer():void {
    this._loginService.update(this.userData[0].id_usuario,new User(this.userData[0].apellido1,this.userData[0].apellido2,this.userData[0].cp,this.userData[0].direccion,this.userData[0].email,this.userData[0].nombre,this.perfilNickname,this.userData[0].pass)).subscribe()
    this.cnfPerChecked=true
    this.cnfPerBtn=false
  }

  // Validar CP
  checkCP(input:any) {
    let regex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/g
    if(input.match(regex)) {
      return true
    } else {
      return false
    }
  }

  // Controlar los cambios en los input de Informacion Personal
  infPerChanges():void{
    this.infPerChecked=false
    this.infPerBtn=true
  }

  // Controlar los cambios en los input de Configurar Perfil
  cnfPerChanges():void{
    this.cnfPerChecked=false
    this.cnfPerBtn=true
  }

  // DELETE de usuario
  unregister():void {
    this._loginService.delete(this.userData[0].id_usuario).subscribe()
    this.router.navigate(['/'])
  }

}
