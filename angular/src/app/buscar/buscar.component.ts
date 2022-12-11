import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DonarService } from '../services/donar.service';
import { CookieService } from 'ngx-cookie-service';

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

  // Variables | Donaciones disponibles
  public donaciones:any=[]
  public donacionesTotales:number=0
  public alergenosPlatos:any=[]
  
  public racionesPlato:any=[]
  public carrito:any=[]
  public carritoCerrado:any=[]
  public showModal:boolean=false

  constructor(private _loginService:LoginService, private _donarService:DonarService, private router:Router, private _cookie:CookieService) {
    this.alergenosPlatos = []
  }

  ngOnInit(): void {
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    this.readAllDonations()

  // Leer todas las ofertas publicadas
    this.tooltipInit()
    this.authGuard()
  }

  readAllDonations():void {
    this._donarService.readAllDonations().subscribe({
      next : data => {

        this.donaciones=data.reverse()
        this.donacionesTotales=data.length

        for (const [i,plato] of this.donaciones.entries()) {
          let alergenosTrue:string[] = [];
          
          let alergenos = JSON.parse(data[i].alergenos);
          for(const alergeno in alergenos){
            if(alergenos[alergeno]){
              alergenosTrue.push(alergeno);
            }
            
          }

          this.alergenosPlatos.push(alergenosTrue.sort());
        }
        
        
        for (let index = 0; index < data.length; index++) {
          this.racionesPlato.push(Array(parseInt(this.donaciones[index].raciones)).fill(1))
          
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
}
