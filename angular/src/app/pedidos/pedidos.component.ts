import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { DemandarService } from '../services/demandar.service';
import { DonarService } from '../services/donar.service';
import { Demand } from '../models/Demand';
import { Donation } from '../models/Donation';

declare var bootstrap:any;

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})

export class PedidosComponent implements OnInit {

  public loading:boolean=false

  // Variables | Login Status
  public loginStatus$:any
  public idUsuario:any

  public demandas : Demand[]
  public totalDemandas:number;
  public platos : Donation[]
  public alergenosPlatos : any[];

  constructor(private _loginService:LoginService, private router:Router, private _cookie:CookieService, private _demandarService: DemandarService, private _donarServicio:DonarService) {
    this.demandas = [];
    this.totalDemandas = 0;
    this.platos = [];
    this.alergenosPlatos = []
  }

  ngOnInit(): void {
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    this.readUserLogged()
    this.tooltipInit()
    this.authGuard()
    setTimeout(()=>{
      this.loading=true
    }, 150);
  }

  // Leer los datos del usuario logeado
  readUserLogged():void {
    this._loginService.readUserLogged().subscribe({
      next : data => {
        if(data!=0) {
          this.idUsuario=data[0].id_usuario
          this.readDemandasByIdu(this.idUsuario)
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

  readDemandasByIdu(idu:any):void {
    this._demandarService.readDemandasByIdu(idu).subscribe({
      next : data => {
        this.demandas=data.reverse();
        this.totalDemandas = this.demandas.length;
        this.platos.length = 0;

        this.demandasToPlatos();
      }

    })
  }

  demandasToPlatos():void{

    for (const demanda of this.demandas) {
      let idDemanda = demanda['id_demanda'];
      let idOferta = demanda['id_oferta'];

      this._donarServicio.readDonationsByIdo(idOferta).subscribe({
        next : data => {
          this.platos[idDemanda] = data[0];
          this.platos[idDemanda]["raciones"] =  parseInt(demanda['n_raciones']);

          let alergenosTrue:string[] = [];

          let alergenos = JSON.parse(data[0].alergenos);
          for(const alergeno in alergenos){
            if(alergenos[alergeno]){
              alergenosTrue.push(alergeno);
            }
          }

          this.alergenosPlatos[idDemanda] = alergenosTrue.sort();

        }
      })

    }
  }

  borrarDemanda(id_demanda:number){
    this._demandarService.delete(id_demanda).subscribe({
      next : data => {
        this.readDemandasByIdu(this.idUsuario)

      }
    });

  }

}
