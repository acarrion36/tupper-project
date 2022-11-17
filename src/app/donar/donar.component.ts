import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DonarService } from '../services/donar.service';
import { CookieService } from 'ngx-cookie-service';
import { Donation } from '../models/Donation';

declare var bootstrap:any;

@Component({
  selector: 'app-donar',
  templateUrl: './donar.component.html',
  styleUrls: ['./donar.component.scss']
})

export class DonarComponent implements OnInit {

  // Variables | Modelo Donation
  public createDonation:Donation = new Donation('','','','','','','','','','','')

  // Variable | Login Status
  public loginStatus$:any
  public idUsuario:any

  // Variables | Informacion del plato
  public nombrePlato:string=""
  public descripcionPlato:string=""
  public notasPlato:string=""
  public alergenosPlato:any=[]
  public racionesPlato:string=""
  public fotoPlato:string=""

  // Variables | Informacion de entrega
  public direccionEntrega:string=""
  public cpEntrega:string=""
  public fechaEntrega:string=""
  public horaEntrega:string=""
  public notasEntrega:string=""

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

  isChecked(radio:string):void {
    let checkbox=document.getElementById(radio) as HTMLInputElement | null;
    if(checkbox!=null) {
      if(checkbox.checked) {
        this.alergenosPlato.push(radio)
      } else {
        const index = this.alergenosPlato.indexOf(radio, 0);
        if (index > -1) {
          this.alergenosPlato.splice(index, 1);
        }
      }
    }
    console.log(JSON.stringify(this.alergenosPlato))
  }

  publicar():void {
    this._donarService.register(new Donation(this.nombrePlato,this.descripcionPlato,this.alergenosPlato,this.notasPlato,this.idUsuario,this.direccionEntrega,this.cpEntrega,this.notasEntrega,this.racionesPlato,this.horaEntrega,this.fechaEntrega)).subscribe({
      next:data => {
        console.log(data)
      }
    })
  }

}
