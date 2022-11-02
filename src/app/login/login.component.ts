import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  // Variables
  public mostrarLogin:boolean=true
  public mostrarRegistro:boolean=false
  public mostrarRegistroExitoso:boolean=false
  public mostrarRecuperacionPassword:boolean=false
  public mostrarRecuperacionExitosa:boolean=false
  public recuperarMail:string=""
  public loginMail:string=""
  public loginPassword:string=""
  public alertMail:boolean=false
  public alertMsg:string=""
  public alertPassword:boolean=false
  public passCheck:string=""
  public loginStatus$:any

  // Constructor | _loginService: Controla si esta logueado | router: Navegación | _cookie: Trabajar con Cookies
  constructor(private _loginService:LoginService, public router: Router, private _cookie:CookieService) {}

  // OnInit | Nos suscribimos al servicio de login y escuchamos el estado de login del usuario
  ngOnInit(): void {
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
  }

  // Formulario de inicio de sesión | Mostramos los campos de inicio de sesión y ocultamos el resto
  iniciarSesion():void {
    this.mostrarLogin=true
    this.mostrarRegistro=false
    this.mostrarRegistroExitoso=false
    this.mostrarRecuperacionPassword=false
    this.mostrarRecuperacionExitosa=false
    this.alertMail=false
    this.alertPassword=false
  }

  // Validar credenciales al pinchar sobre "INICIAR SESIÓN"
  validarSesion():void {
    if(this.loginMail=="") {
      this.alertMail=true
      this.alertPassword=false
      this.alertMsg="Introduce tu correo electronico."
    } else if(this.loginMail=="entecillo@gmail.com") {
      if(this.loginPassword=="") {
        this.alertPassword=true
        this.alertMail=false
        this.alertMsg="Escribe tu contraseña."
      } else if(this.loginPassword=="1234") {
        // Si se validan los datos, seteamos el estado a true, cerramos la ventana de login, seteamos la cookie y redirigimos al perfil
        this._loginService.setloginStatus(true)
        this._loginService.setloginWindowStatus(false)
        this._cookie.set("loginStatus",this.loginStatus$,{expires:365})
        this.router.navigate(['perfil'])
      } else {
        this.alertPassword=true
        this.alertMail=false
        this.alertMsg="Contraseña incorrecta."
        this.loginPassword=""
      }
    } else {
      this.alertMail=true
      this.alertPassword=false
      this.alertMsg="El correo no existe o no es válido."
    }
  }

  // Formulario de registro
  registro():void {
    this.mostrarRegistro=true
    this.mostrarLogin=false
    this.alertMail=false
    this.alertPassword=false
  }

  // Validar formulario de registro **FALTA VALIDAR CAMPOS**
  registroExistoso():void {
    // Llamada al metodo checkPassword | Se pasa la contraseña escrita por el usuario como parámetro
    if(this.checkPassword(this.passCheck)){
      this.mostrarRegistro=false
      this.mostrarRegistroExitoso=true
      this._loginService.setloginStatus(true)
      this._cookie.set("loginStatus",this.loginStatus$,{expires:365})
    } else {
      this.alertPassword=true
      this.alertMsg="La contraseña debe tener entre 6 y 20 carácteres. Al menos un numero, una letra mayuscula y una letra minuscula. Por ejemplo, Elika123."
    }
  }

  // Formulario de recuperación de contraseña
  recuperarPassword():void {
    this.mostrarRecuperacionPassword=true
    this.mostrarLogin=false
    this.alertMail=false
    this.alertPassword=false
  }

  // Validar recuperación de contraseña
  validarRecuperacionPass():void {
    if(this.recuperarMail == "") {
      this.alertMail=true
      this.alertMsg="Introduce tu correo electronico."
    } else if(this.recuperarMail == "entecillo@gmail.com") {
        this.mostrarRecuperacionPassword=false
        this.mostrarRecuperacionExitosa=true
    } else {
      this.alertMail=true
      this.alertMsg="El correo no existe o no es válido."
    }
  }

  // Cerrar ventana de login
  closeLoginWindow():void {
    this._loginService.setloginWindowStatus(false)
  }

  // Regexp | Validar contraseña con patron
  checkPassword(input:any) {
    let password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    if(input.match(password)) {
      return true;
    } else {
      this.passCheck=""
      return false;
    }
  }

}
