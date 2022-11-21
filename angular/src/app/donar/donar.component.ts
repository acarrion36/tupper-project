import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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
  public createDonation:Donation = new Donation('','','','','','','','',1,'','')
  public idDonacion:any

  // Variables | Login Status
  public loginStatus$:any
  public idUsuario:any

  // Variables | Informacion del plato
  public nombrePlato:string=""
  public descripcionPlato:string=""
  public notasPlato:string=""
  public alergenosPlato:any=[]
  public racionesPlato:number=1
  public fotoPlato:string=""
  public alertNombrePlato:boolean=false
  public alertDescripcionPlato:boolean=false
  public alertRacionesPlato:boolean=false

  // Variables | Informacion de entrega
  public direccionEntrega:string=""
  public cpEntrega:string=""
  public fechaEntrega:string=""
  public horaEntrega:string=""
  public notasEntrega:string=""
  public alertDireccionEntrega:boolean=false
  public alertCPEntrega:boolean=false
  public alertFechaEntrega:boolean=false
  public alertHoraEntrega:boolean=false
  public alertMsg:string=""
  public showModal:boolean=false

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

  publicar():void {
    if(!this.nombrePlato){
      this.alertNombrePlato=true
    } else {
      this.alertNombrePlato=false
    }
    if(!this.descripcionPlato){
      this.alertDescripcionPlato=true
    } else {
      this.alertDescripcionPlato=false
    }
    if(!this.direccionEntrega){
      this.alertDireccionEntrega=true
    } else {
      this.alertDireccionEntrega=false
    }
    if(!this.cpEntrega){
      this.alertCPEntrega=true;
      this.alertMsg="Campo obligatorio."
    } else if(!this.checkCP(this.cpEntrega)) {
      this.alertCPEntrega=true;
      this.alertMsg="Formato no válido."
    } else {
      this.alertCPEntrega=false
    }
    if(!this.fechaEntrega){  // COMPROBAR FECHA NO ANTERIOR AL DIA DE HOY
      this.alertFechaEntrega=true
    } else {
      this.alertFechaEntrega=false
    }
    if(!this.horaEntrega){ // COMPROBAR HORA NO ANTERIOR A LA HORA ACTUAL
      this.alertHoraEntrega=true
    } else {
      this.alertHoraEntrega=false
    }
    if(!this.alertNombrePlato&&!this.alertDescripcionPlato&&!this.alertDireccionEntrega&&!this.alertCPEntrega&&!this.alertFechaEntrega&&!this.alertHoraEntrega){
      this._donarService.register(new Donation(this.nombrePlato,this.descripcionPlato,JSON.stringify(this.alergenosPlato.sort()),this.notasPlato,this.idUsuario,this.direccionEntrega,this.cpEntrega,this.notasEntrega,this.racionesPlato,this.horaEntrega,this.fechaEntrega)).subscribe({
        next:data => {
          this.idDonacion=data[0].id_oferta
        }
      })
      this.showModal=true
    }
  }

  // Construir un array con los alergenos seleccionados
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
  }

  // Validad raciones
  checkRation():void {
    if(this.racionesPlato<1){
      this.racionesPlato=1
    }
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

  // Cerrar ventana modal
  closeModal(form:NgForm):void {
    this.showModal=false
    // Vaciado de campos
    form.resetForm();
    window.scrollTo(0, 0);
  }

}
