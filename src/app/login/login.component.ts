import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login.service';
import { RegistroService } from '../services/registro.service';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  // Variables | Modelo User
  public createUser:User;
  public usersData:any

  // Variables | Login
  public mostrarLogin:boolean=true
  public mostrarRegistro:boolean=false
  public mostrarRegistroExitoso:boolean=false
  public mostrarRecuperacionPassword:boolean=false
  public mostrarRecuperacionExitosa:boolean=false
  public recuperarMail:string=""
  public loginMail:string=""
  public loginPassword:string=""
  public alertMail:boolean=false
  public alertPassword:boolean=false
  public alertMsg:string=""
  public loginStatus$:any

  // Variables | Registro
  public registroNombre:string=""
  public registroApellido1:string=""
  public registroApellido2:string=""
  public registroMail:string=""
  public registroPassword:string=""
  public alertNombre:boolean=false
  public alertApellido1:boolean=false
  public alertApellido2:boolean=false
  public alertPasswordMsg:string=""
  public alertMailMsg:string=""

  // Constructor | _loginService: Controla si esta logueado | _registroService: Servicio de registro de nuevo usuario | router: Navegación | _cookie: Trabajar con Cookies
  constructor(private _loginService:LoginService, private _registroService:RegistroService, public router: Router, private _cookie:CookieService) {
    // Inicializamos el objeto User
    this.createUser = new User('','','','','','','','')
  }

  // OnInit | Nos suscribimos al servicio de login y escuchamos el estado de login del usuario
  ngOnInit(): void {
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    // Llamada al metodo read
    this.read()
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
    } else if(this.checkMail(this.loginMail)) {
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
      this.alertMsg="Correo electrónico no dado de alta."
    }
  }

  // Formulario de registro
  registro():void {
    this.mostrarRegistro=true
    this.mostrarLogin=false
    this.alertMail=false
    this.alertPassword=false
  }

  // Validar formulario de registro
  registroExistoso():void {
    if(!this.registroNombre) {
      this.alertNombre=true
      this.alertMsg="Campo obligatorio."
    } else {
      this.alertNombre=false
    }
    if(!this.registroApellido1) {
      this.alertApellido1=true
      this.alertMsg="Campo obligatorio."
    } else {
      this.alertApellido1=false
    }
    if(!this.registroApellido2) {
      this.alertApellido2=true
      this.alertMsg="Campo obligatorio."
    } else {
      this.alertApellido2=false
    }
    if(!this.registroMail) {
      this.alertMail=true
      this.alertMailMsg="Campo obligatorio."
    } else {
      this.alertMail=false
      if(!this.validateMail(this.registroMail)){
        this.alertMail=true
        this.alertMailMsg="Correo electrónico no válido."
      } else if(this.checkMail(this.registroMail)) {
        this.alertMail=true
        this.alertMailMsg="Correo electrónico ya dado de alta."
      }
    }
    if(!this.registroPassword) {
      this.alertPassword=true
      this.alertPasswordMsg="Campo obligatorio."
      // Llamada al metodo checkPassword | Se pasa la contraseña escrita por el usuario como parámetro
    } else if(!this.validatePassword(this.registroPassword)){
      this.alertPassword=true
      this.alertPasswordMsg="La contraseña debe tener entre 6 y 20 carácteres. Al menos un numero, una letra mayuscula y una letra minuscula. Por ejemplo, Elika123."
    } else {
      this.alertPassword=false
    }
    if(!this.alertNombre&&!this.alertApellido1&&!this.alertApellido2&&!this.alertMail&&!this.alertPassword) {
      this.mostrarRegistro=false
      this.mostrarRegistroExitoso=true
      this._loginService.setloginStatus(true)
      this._cookie.set("loginStatus",this.loginStatus$,{expires:365})
      this.createUser = new User(this.registroApellido1,this.registroApellido2,'','',this.registroMail,this.registroNombre,'',this.registroPassword)
      this._registroService.newAccount(this.createUser).subscribe({
        next:data => {
          console.log("Create", data);
        },
        error:error => {
          console.log("Create error", error);
        }
      });
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

  // Comprobrar si el mail ya esta dado de alta
  checkMail(input:any) {
    let exists:boolean=false
    for(let i=0;i<this.usersData.length;i++){
      if(this.usersData[i].email===input) {
        exists=true
        break
      }
    }
    return exists
  }

  // Regexp | Validar mail con patron
  validateMail(input:any) {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if(input.match(regex)) {
      return true
    } else {
      return false
    }
  }

  // Regexp | Validar contraseña con patron
  validatePassword(input:any) {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/g
    if(input.match(regex)) {
      return true
    } else {
      this.registroPassword=""
      return false
    }
  }

  // Leer los usuarios registrados
  read():void {
    this._loginService.readUsers().subscribe({
      next : data => {
        console.log("Read", data);
        this.usersData = data;
      },
      error : error => {
        console.log("Read error", error);
      }
    });
  }

}
