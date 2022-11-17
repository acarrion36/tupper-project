import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  // Variables | Modelo User
  public createUser:User = new User('','','','','','','','')
  public usersData:any

  // Variables | Login
  public loginStatus$:any
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

  // Constructor | _loginService: Controla si esta logueado | router: Navegación
  constructor(private _loginService:LoginService, public router: Router) {}

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
    // Control de campo vacio
    if(!this.loginMail) {
      this.alertMail=true
      this.alertPassword=false
      this.alertMsg="Introduce tu correo electronico."
      // Validar formato
    } else if(this.validateMail(this.loginMail)) {
      // POST de usuario por mail
      this._loginService.readUserByMail(this.loginMail).subscribe({
        next:data => {
          // Si el back devuelve 0, el correo no esta dado de alta
          if(data===0){
            this.alertMail=true
            this.alertPassword=false
            this.alertMsg="Correo electrónico no dado de alta."
          } else {
            // Control de campo vacio
            if(!this.loginPassword) {
              this.alertPassword=true
              this.alertMail=false
              this.alertMsg="Escribe tu contraseña."
              // Si la pass es correcta...
            } else if(this.loginPassword===data[0].pass) {
              //...se validan los datos, cerramos la ventana de login, seteamos las cookies y redirigimos al perfil
              this._loginService.setloginWindowStatus(false)
              this._loginService.setToken(btoa(data[0].email))
              this._loginService.setloginStatus(true)
              this.router.navigate(['perfil'])
            } else {
              this.alertPassword=true
              this.alertMail=false
              this.alertMsg="Contraseña incorrecta."
              this.loginPassword=""
            }
          }
        },
        error:error => {
          console.log("Create error", error)
        }
      })
    } else {
      this.alertMail=true
      this.alertPassword=false
      this.alertMsg="Formato de correo electrónico no válido."
    }
  }

  // Formulario de registro
  registro():void {
    this.mostrarRegistro=true
    this.mostrarLogin=false
    this.alertMail=false
    this.alertPassword=false
  }

  // Validar formulario de registro al pinchar en "CREAR UNA CUENTA"
  registroExistoso():void {
    // Control de campo vacio
    if(!this.registroNombre) {
      this.alertNombre=true
      this.alertMsg="Campo obligatorio."
    } else {
      this.alertNombre=false
    }
    // Control de campo vacio
    if(!this.registroApellido1) {
      this.alertApellido1=true
      this.alertMsg="Campo obligatorio."
    } else {
      this.alertApellido1=false
    }
    // Control de campo vacio
    if(!this.registroApellido2) {
      this.alertApellido2=true
      this.alertMsg="Campo obligatorio."
    } else {
      this.alertApellido2=false
    }
    // Control de campo vacio
    if(!this.registroMail) {
      this.alertMail=true
      this.alertMailMsg="Campo obligatorio."
      // Validar formato
    } else if(this.validateMail(this.registroMail)) {
      // GET por mail de usuario
      this._loginService.readUserByMail(this.registroMail).subscribe({
        next:data => {
          // Si el back devuelve distinto de 0, el usuario esta dado de alta
          if(data!=0){
            this.alertMail=true
            this.alertMailMsg="Correo electrónico ya dado de alta."
          } else {
            this.alertMail=false
            // Si todos los campos son validos (alarmas 0)...
            if(!this.alertNombre&&!this.alertApellido1&&!this.alertApellido2&&!this.alertMail&&!this.alertPassword) {
              // ...POST de usuario registrado
              this._loginService.register(new User(this.registroApellido1,this.registroApellido2,'','',this.registroMail,this.registroNombre,'',this.registroPassword)).subscribe({
                next:data => {
                  this._loginService.setToken(btoa(data[0].email))
                }
              })
              this.mostrarRegistro=false
              this.mostrarRegistroExitoso=true
              this._loginService.setloginStatus(true)
            }
          }
        }
      })
    } else {
      this.alertMail=true
      this.alertMailMsg="Formato de correo electrónico no válido."
    }
    // Control de campo vacio
    if(!this.registroPassword) {
      this.alertPassword=true
      this.alertPasswordMsg="Campo obligatorio."
      // Validar formato
    } else if(!this.validatePassword(this.registroPassword)){
      this.alertPassword=true
      this.alertPasswordMsg="La contraseña debe tener entre 6 y 20 carácteres. Al menos un numero, una letra mayuscula y una letra minuscula. Por ejemplo, Elika123."
    } else {
      this.alertPassword=false
    }
  }

  // Formulario de recuperación de contraseña
  recuperarPassword():void {
    this.mostrarRecuperacionPassword=true
    this.mostrarLogin=false
    this.alertMail=false
    this.alertPassword=false
  }

  // Validar recuperación de contraseña ++PENDIENTE++
  validarRecuperacionPass():void {
    if(this.recuperarMail=="") {
      this.alertMail=true
      this.alertMsg="Introduce tu correo electronico."
      // Control de campo vacio
    } else if(this.validateMail(this.recuperarMail)) {
      this.alertMail=false
      // GET por mail de usuario
      this._loginService.readUserByMail(this.recuperarMail).subscribe({
        next:data => {
          // Si el back devuelve distinto de 0, el usuario esta dado de alta
          if(data!=0){
            this.mostrarRecuperacionPassword=false
            this.mostrarRecuperacionExitosa=true
          } else {
            this.alertMail=true
            this.alertMsg="El correo no existe."
          }
        }
      })
    } else {
      this.alertMail=true
      this.alertMsg="Formato de correo electrónico no válido."
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

}
