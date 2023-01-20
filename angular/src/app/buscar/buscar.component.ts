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

  public loading:boolean=false
  public demandas:any=[]
  public idDemanda:any
  public nDemandas:number=0
  public nRacionesActuales:number=0
  public solicitarBtn:boolean=false
  public raciones:any

  // Variables | Login Status
  public loginStatus$:any
  public alertInfo$:any
  public idUsuario:any

  // Variables | Donaciones disponibles
  public donaciones:any=[]
  public donacionesTotales:number=0
  public alergenosPlatos:any=[]

  public racionesPlato:any=[]
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
    setTimeout(()=>{
      this.loading=true
    }, 500);
  }

  // Leer los datos del usuario logeado
  readUserLogged():void {
    this._loginService.readUserLogged("token").subscribe({
      next : data => {
        if(data!=0) {
          this.readActualUserDemands(data[0].id_usuario)
          this.readActualUserDonations(data[0].id_usuario)
          this.idUsuario=data[0].id_usuario
          // Controlar el mensaje de alerta si no esta rellenados direccion y CP
          if(data[0].direccion!='' && data[0].cp!=null){ // Si estan rellenados
            this._loginService.setalertInfoStatus(false)
          } else {
            this._loginService.setalertInfoStatus(true)
          }
        } else {
          this._loginService.setalertInfoStatus(true)
        }
      }
    })
  }

  racionesOferta(id:number):number {
    let raciones:number=0
    this._donarService.readDonationsByIdo(id).subscribe({
      next : data => {
        raciones = data[0].raciones
      }
    })
    return raciones
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
          this.demandas.push(data[index])
        }
      }
    })
  }

  existeDemanda(idOferta:any):any {
    let existe:boolean = false
    if(this.demandas.length > 0) {
      for (let index = 0; index < this.demandas.length; index++) {
        if (this.demandas[index].id_oferta.indexOf(idOferta)===-1) {
          existe = false
        } else {
          this.idDemanda = this.demandas[index].id_demanda
          this.nRacionesActuales = this.demandas[index].n_raciones
          existe = true
          break
        }
      }
      return existe
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
          let racionesReservadas = 0;
          this._demandarService.readRacionesByIdo(plato.id_oferta).subscribe({
            next:data => {
              if(data[0]["raciones"] != null){
                racionesReservadas = data[0]["raciones"];
              }
              let racionesDisponiblesPlato = racionesTotales - racionesReservadas;
              this.racionesDisponibles[plato.id_oferta] = racionesDisponiblesPlato;
              if(this.racionesDisponibles[plato.id_oferta]===0) {
                this.donacionesTotales -= 1
              }
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

  // Cerrar ventana modal
  closeModal():void {
    this.showModal=false
  }

  // Comprobar raciones
  comprobarRaciones(id_oferta:number){
    this.raciones = document.querySelectorAll("#plato_"+id_oferta + ' input[type="checkbox"]:checked').length;
  }

  // Solicitar raciones
  solicitar(id_oferta:number){
    this.raciones = document.querySelectorAll("#plato_"+id_oferta + ' input[type="checkbox"]:checked').length;
    if(this.existeDemanda(id_oferta)) {
      this.raciones += Number(this.nRacionesActuales)
      let updateDemanda = ({
        "id_demanda": this.idDemanda.toString(),
        "n_raciones": this.raciones.toString()
      })
      this._demandarService.update(updateDemanda).subscribe({
        next : data => {
          window.location.reload();
        }
      })
    } else {
      let demanda = new Demand(0, this.idUsuario, id_oferta.toString(), this.raciones.toString(), "", 0, "");
      this._demandarService.post(demanda).subscribe({
        next : data => {
          window.location.reload();
        }
      })
    }
  }

  // Metodo | Mostrar el componente de login
  mostrar():void {
    if(this.loginStatus$) {
      this._loginService.setloginWindowStatus(false)
      this._loginService.setlogoutWindowStatus(true)
    } else {
      this._loginService.setlogoutWindowStatus(false)
      this._loginService.setloginWindowStatus(true)
    }
  }

}
