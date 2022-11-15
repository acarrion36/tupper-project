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
    if(!this.loginMail) {
      this.alertMail=true
      this.alertPassword=false
      this.alertMsg="Introduce tu correo electronico."
    } else if(this.validateMail(this.loginMail)) {
      this._loginService.readUserByMail(this.loginMail).subscribe({
        next:data => {
          if(data===0){
            this.alertMail=true
            this.alertPassword=false
            this.alertMsg="Correo electrónico no dado de alta."
          } else {
            if(!this.loginPassword) {
              this.alertPassword=true
              this.alertMail=false
              this.alertMsg="Escribe tu contraseña."
            } else if(this.loginPassword===data[0].pass) {
              // Si se validan los datos, cerramos la ventana de login, seteamos las cookies y redirigimos al perfil
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
    } else if(this.validateMail(this.registroMail)) {
      this._loginService.readUserByMail(this.registroMail).subscribe({
        next:data => {
          if(data!=0){
            this.alertMail=true
            this.alertMailMsg="Correo electrónico ya dado de alta."
          } else {
            this.alertMail=false
          }
        },
        error:error => {
          console.log("Create error", error)
        }
      })
    } else {
      this.alertMail=true
      this.alertMailMsg="Formato de correo electrónico no válido."
    }
    if(!this.registroPassword) {
      this.alertPassword=true
      this.alertPasswordMsg="Campo obligatorio."
    } else if(!this.validatePassword(this.registroPassword)){
      this.alertPassword=true
      this.alertPasswordMsg="La contraseña debe tener entre 6 y 20 carácteres. Al menos un numero, una letra mayuscula y una letra minuscula. Por ejemplo, Elika123."
    } else {
      this.alertPassword=false
    }
    if(!this.alertNombre&&!this.alertApellido1&&!this.alertApellido2&&!this.alertMail&&!this.alertPassword) {
      this._loginService.register(new User(this.registroApellido1,this.registroApellido2,'','',this.registroMail,this.registroNombre,'',this.registroPassword)).subscribe({
        next:data => {
          this._loginService.setToken(btoa(data[0].email))
        },
        error:error => {
          console.log("Create error", error)
        }
      })
      this.mostrarRegistro=false
      this.mostrarRegistroExitoso=true
      this._loginService.setloginStatus(true)
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

}
