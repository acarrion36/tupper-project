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

  // Variables | Login Status
  public loginStatus$:any
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
    this.readAllDonations()

  // Leer todas las ofertas publicadas
    this.tooltipInit()
    this.readUserLogged()
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
          let racionesDisponiblesPlato = racionesTotales - racionesReservadas;
          
          this.racionesDisponibles[plato.id_oferta] = racionesDisponiblesPlato;

          
        }
        
        
        
        // for (let index = 0; index < data.length; index++) {
        //   this.racionesPlato.push(Array(parseInt(this.donaciones[index].raciones)).fill(1))
          
        // }
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


  // Crear un carrito con el id de oferta y la cantidad de raciones
  envioCarrito():void {
    const resultado:any=[]
    for (const el of this.carrito) resultado[el] = resultado[el] + 1 || 1
    for (let index = 0; index < resultado.length; index++) {
      if(resultado[index]!=null){
        this.carritoCerrado.push({"id": index, "cdt": resultado[index]})
      }
    }
    this.showModal=true
  }

  // Cerrar ventana modal
  closeModal():void {
    this.showModal=false
    this.carritoCerrado=[]
  }

  // Solicitar raciones
  solicitar(id_oferta:number){
    let raciones = document.querySelectorAll("#plato_"+id_oferta + ' input[type="checkbox"]:checked').length;
    
    let demanda = new Demand(this.idUsuario, id_oferta.toString(), raciones.toString(), "", 0, "");

    this._demandarService.post(demanda).subscribe({
      next:data => {
        // this.idDonacion=data[0].id_oferta
        console.log(data);
        
      }
    });

  }
}
