import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DonarService } from '../services/donar.service';
import { CookieService } from 'ngx-cookie-service';

declare var bootstrap:any;

@Component({
  selector: 'app-donarencurso',
  templateUrl: './donarencurso.component.html',
  styleUrls: ['./donarencurso.component.scss']
})

export class DonarencursoComponent implements OnInit {

  // Variables | Login Status
  public loginStatus$:any
  public idUsuario:any

  // Variable | Donaciones del usuario
  public donaciones:any=[]
  public donacionesEnCurso:number=0
  public alergenosPlato:any=[]
  public racionesPlato:any=[]

  constructor(private _loginService:LoginService, private _donarService:DonarService, private router:Router, private _cookie:CookieService) { }

  ngOnInit(): void {
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    this.readUserLogged()
    this.tooltipInit()
    this.authGuard()
  }

  // Leer los datos del usuario logeado
  readUserLogged():void {
    this._loginService.readUserLogged().subscribe({
      next : data => {
        if(data!=0) {
          this.idUsuario=data[0].id_usuario
          this.readDonationsByIdu(this.idUsuario)
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
    } else {
      this._loginService.setloginStatus(true)
      this._loginService.setalertInfoStatus(false)
    }
  }

  readDonationsByIdu(idu:any):void {
    this._donarService.readDonationsByIdu(idu).subscribe({
      next : data => {
        console.log(data)
        this.donaciones=data.reverse()
        this.donacionesEnCurso=data.length
        for (let index = 0; index < data.length; index++) {
          this.alergenosPlato.push(JSON.parse(data[index].alergenos))
          this.racionesPlato.push(Array(parseInt(data[index].raciones)).fill(1))
        }
      }
    })
  }

}
