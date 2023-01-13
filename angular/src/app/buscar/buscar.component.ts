import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DonarService } from '../services/donar.service';
import { DemandarService } from '../services/demandar.service';
import { CookieService } from 'ngx-cookie-service';
import { Demand } from '../models/Demand';

declare var bootstrap:any;

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})

export class BuscarComponent implements OnInit {

  public count:number=0
  public loading:boolean=false
  public demandasTotales:any=[]

  // Variables | Login Status
  public loginStatus$:any
  public alertInfo$:any
  public idUsuario:any

  // Variables | Donaciones disponibles
  public donaciones:any=[]
  public donacionesTotales:number=0
  public alergenosPlatos:any=[]

  public racionesPlato:any=[]
  public carrito:any=[]
  public carritoCerrado:any=[]
  public showModal:boolean=false
  public racionesDisponibles:number[];

  constructor(private _loginService:LoginService, private _donarService:DonarService, private _demandarService:DemandarService, private router:Router, private _cookie:CookieService) {
    this.alergenosPlatos = []
    this.racionesDisponibles = [];
  }

  ngOnInit(): void {
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    this._loginService.alertInfoStatus$.subscribe((status:boolean) => this.alertInfo$ = status)
    this.readUserLogged()
    this.readAllDonations()
    this.tooltipInit()
    this.authGuard()
    setTimeout(()=>{
      this.loading=true
    }, 400);
  }

  // Leer los datos del usuario logeado
  readUserLogged():void {
    this._loginService.readUserLogged().subscribe({
      next : data => {
        if(data!=0) {
          this.readActualUserDemands(data[0].id_usuario)
          this.readActualUserDonations(data[0].id_usuario)
          this.idUsuario=data[0].id_usuario
          // Controlar el mensaje de alerta si no esta rellenados direccion y CP
          if(data[0].direccion!='' && data[0].cp!=null){
            this._loginService.setalertInfoStatus(false)
          } else {
            this._loginService.setalertInfoStatus(true)
          }
        }
      }
    })
  }

  readActualUserDonations(id:any):void {
    this._donarService.readDonationsByIdu(id).subscribe({
      next : data => {
        this.donacionesTotales -= data.length
      }
    })
  }

  readActualUserDemands(id:any):void {
    this._demandarService.readDemandasByIdu(id).subscribe({
      next : data => {
        for (let index = 0; index < data.length; index++) {
          this.demandasTotales.push(data[index].id_oferta)
        }
      }
    })
  }

  existeDemanda(idOferta:any):boolean {
    if (this.demandasTotales.indexOf(idOferta)===-1) {
      return false
    } else {
      return true
    }
  }

  readAllDonations():void {
    this._donarService.readAllDonations().subscribe({
      next : data => {

        this.donaciones=data.reverse()
        this.donacionesTotales=data.length

        for (const [i,plato] of this.donaciones.entries()) {
          let alergenosTrue:string[] = [];

          // Alérgenos
          let alergenos = JSON.parse(data[i].alergenos);
          for(const alergeno in alergenos){
            if(alergenos[alergeno]){
              alergenosTrue.push(alergeno);
            }
          }
          this.alergenosPlatos.push(alergenosTrue.sort());

          // Raciones
          let racionesTotales = plato.raciones;
          let racionesReservadas = 0; // PENDIENTE!!
          this._demandarService.readRacionesByIdo(plato.id_oferta).subscribe({
            next:data => {
              if(data[0]["raciones"] != null){
                racionesReservadas = data[0]["raciones"];
              }
              let racionesDisponiblesPlato = racionesTotales - racionesReservadas;
              this.racionesDisponibles[plato.id_oferta] = racionesDisponiblesPlato;
            }
          });

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

  // Controlar el numero de raciones demandadas
  isChecked(radio:string):void {
    let checkbox=document.getElementById(radio) as HTMLInputElement | null;
    if (checkbox!=null) {
      if (checkbox.checked) {
        this.count++
        this.carrito.push(checkbox.value)
      } else {
        this.count--
        const index = this.carrito.indexOf(checkbox.value, 0);
        if (index > -1) {
          this.carrito.splice(index, 1);
        }
      }
    }
  }

  // Cerrar ventana modal
  closeModal():void {
    this.showModal=false
    this.carritoCerrado=[]
  }

  // Solicitar raciones
  solicitar(id_oferta:number){
    if(this.existeDemanda(id_oferta)) {
      let raciones = document.querySelectorAll("#plato_"+id_oferta + ' input[type="checkbox"]:checked').length;
      let demanda = new Demand(0, this.idUsuario, id_oferta.toString(), raciones.toString(), "", 0, "");
      this._demandarService.update(demanda).subscribe({
        next:data => {
          window.location.reload();
        }
      });
    } else {
      let raciones = document.querySelectorAll("#plato_"+id_oferta + ' input[type="checkbox"]:checked').length;
      let demanda = new Demand(0, this.idUsuario, id_oferta.toString(), raciones.toString(), "", 0, "");
      this._demandarService.post(demanda).subscribe({
        next:data => {
          window.location.reload();
        }
      });
    }
  }
}
