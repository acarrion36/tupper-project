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
  public perfilNickname:string="Kete"
  public perfilMail:string="a@a.com"
  public perfilFoto:string=""
  public loginStatus$:any
  public alertInfo$:any
  public saveInfPerBtn:boolean=false
  public saveCnfPerBtn:boolean=false
  public usersData:any

  // Constructor | _loginService: Controla si esta logueado | router: Navegación
  constructor(private _loginService:LoginService, private router:Router) {}

  // OnInit
  ngOnInit():void {
    this.read()
    // Suscripción a loginService | Escuchamos el estado del login y de la información personal
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    this._loginService.alertInfoStatus$.subscribe((status:boolean) => this.alertInfo$ = status)
    // Inicializr bootstrap tooltip
    this.tooltipInit()
    // Si no esta logueado, redirigimos a la home y mostramos la ventana de login
    this.authGuard()
    // Comprobar si la información personal esta completa
    this.checkInfo()
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
    if(this.perfilNombre!="Pedro" || this.perfilApellidos!="Pardo" || this.perfilDireccion!="" || this.perfilTelefono!=""){
      this.saveInfPerBtn=true
    } else {
      this.saveInfPerBtn=false
    }
  }

  // Controlar cambios en el formulario Configurar perfil
  changeCnfPerBtn():void {
    if(this.perfilNickname!="Kete"){
      this.saveCnfPerBtn=true
    } else {
      this.saveCnfPerBtn=false
    }
  }

  tooltipInit():void{
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }

  authGuard():void{
    if(!this.loginStatus$) {
      this.router.navigate(['/'])
      this._loginService.setloginWindowStatus(true)
    }
  }

  checkInfo():void{
    if(this.perfilNombre && this.perfilApellidos && this.perfilDireccion && this.perfilTelefono){
      this._loginService.setalertInfoStatus(false)
    }
  }

  read():void{
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
