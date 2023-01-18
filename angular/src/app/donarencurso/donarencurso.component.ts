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

  public loading:boolean=false

  // Variables | Login Status
  public loginStatus$:any
  public alertInfo$:any
  public idUsuario:any

  // Variable | Donaciones del usuario
  public donaciones:any=[]
  public donacionesEnCurso:number=0
  public alergenosPlatos:any[];
  public racionesPlato:any=[]

  constructor(private _loginService:LoginService, private _donarService:DonarService, private router:Router, private _cookie:CookieService) {
    this.alergenosPlatos = []
   }

  ngOnInit(): void {
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    this._loginService.alertInfoStatus$.subscribe((status:boolean) => this.alertInfo$ = status)
    this.readUserLogged()
    this.tooltipInit()
    this.authGuard()
    setTimeout(()=>{
      this.loading=true
    }, 400);
  }

  // Leer los datos del usuario logeado
  readUserLogged():void {
    this._loginService.readUserLogged("token").subscribe({
      next : data => {
        if(data!=0) {
          this.idUsuario=data[0].id_usuario
          this.readDonationsByIdu(this.idUsuario)
          // Controlar el mensaje de alerta si no esta rellenados direccion y CP
          if(data[0].direccion!='' && data[0].cp!=null){ // Si estan rellenados
            this._loginService.setalertInfoStatus(false)
          } else {
            this._loginService.setalertInfoStatus(true)
          }
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
    } else if (this._cookie.check("token") && !this._cookie.check("info")) {
      this.router.navigate(['/perfil'])
    }
  }
  readDonationsByIdu(idu:any):void {
    this._donarService.readDonationsByIdu(idu).subscribe({
      next : data => {
        this.donaciones=data.reverse()
        this.donacionesEnCurso=data.length

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
          this.racionesPlato.push(Array(parseInt(data[index].raciones)).fill(1))

        }

      }
    })
  }

  borrarEntrega(id_oferta:number){
    this._donarService.delete_oferta(id_oferta).subscribe({
      next : data => {
        this.readDonationsByIdu(this.idUsuario);
      }
    })
  }

}
