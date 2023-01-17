import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { DonarService } from '../services/donar.service';
//import { EditarEntregaComponent } from '../editar-entrega/editar-entrega.component';
import { CookieService } from 'ngx-cookie-service';
import { Donation } from '../models/Donation';
import { DatePipe } from '@angular/common';

declare var bootstrap:any;

@Component({
  selector: 'app-donar-formulario',
  templateUrl: './donar-formulario.component.html',
  styleUrls: ['./donar-formulario.component.scss'],
  providers: [DatePipe]
})
export class DonarFormularioComponent implements OnInit {

  private alerstring:string ="";
  private alerjson:any = {};

  public hoy:string | null;
  private donando:boolean;

  // Variables | Modelo Donation
  public createDonation:Donation = new Donation('','','','','','','','',1,'','', '');
  public idDonacion:any
  public id_menu:string;

  // Variables | Login Status
  public loginStatus$:any
  public idUsuario:any
  public alertInfo$:any

  // Variables | Informacion del plato
  /*
  public nombrePlato:string=""
  public descripcionPlato:string=""
  public notasPlato:string=""
  public racionesPlato:number=1
  */
  public fotoPlato:string=""
  public alergenosPlato:string[];
  public alergenosLista:string[];
  public alergenosChecked:any;

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
  public alertHoraNoValida:boolean=false
  public alertMsg:string=""
  public showModal:boolean=false

  constructor(
    private _loginService:LoginService,
    private _donarService:DonarService,
    //private EditarEntregaComponente:EditarEntregaComponent,
    private router:Router,
    private _cookie:CookieService,
    private ruta:ActivatedRoute,
    private datePipe: DatePipe
  ) {

    this.hoy = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.donando = false;
    this.id_menu = "";
    this.alergenosPlato = []
    this.alergenosChecked = {}
    this.alergenosLista = ["gluten", "crustaceos", "huevos", "pescado", "cacahuetes", "soja", "lacteos", "frutos_secos", "apio", "mostaza", "sesamo", "sulfitos", "moluscos", "altramuces"].sort();

    this.ruta.params.subscribe(params=>{
      this.idDonacion = params['id_entrega'];

      if(params['id_entrega']) {
        this.donando = true;

        this._donarService.readDonationsByIdo(this.idDonacion).subscribe({
          next : data => {
            this.createDonation = data[0];
            this.alergenosChecked = JSON.parse(this.createDonation.alergenos);
          }
        })
      }
    })
  }

  ngOnInit(): void {
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    this._loginService.alertInfoStatus$.subscribe((status:boolean) => this.alertInfo$ = status)
    this.readUserLogged()
    this.tooltipInit()
    this.authGuard();
  }

  // Leer los datos del usuario logeado
  readUserLogged():void {
    this._loginService.readUserLogged().subscribe({
      next : data => {
        if(data!=0) {
          this.idUsuario=data[0].id_usuario;
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
    } else if (this._cookie.check("token") && this.alertInfo$) {
      this.router.navigate(['/perfil'])
    } else {
      this._loginService.setloginStatus(true)
      this._loginService.setalertInfoStatus(false)
    }
  }

  publicar():void {
    if(!this.createDonation.nombre){
      this.alertNombrePlato=true
    } else {
      this.alertNombrePlato=false
    }
    if(!this.createDonation.descripcion){
      this.alertDescripcionPlato=true
    } else {
      this.alertDescripcionPlato=false
    }
    if(!this.createDonation.direccion){
      this.alertDireccionEntrega=true
    } else {
      this.alertDireccionEntrega=false
    }
    if(!this.createDonation.f_recogida){
      this.alertFechaEntrega=true
    } else {
      this.alertFechaEntrega=false
    }
    if(!this.createDonation.h_recogida){
      this.alertHoraEntrega=true
    } else {
      this.alertHoraEntrega=false
      this.alertHoraNoValida=false

      let horaActual = new Date() // Fecha actual
      let horaSeleccionada = new Date() // Creo una fecha nueva
      let horaMinuto = this.createDonation.h_recogida.toString().split(":") // Split de la hora actual
      let anioMesDia = this.createDonation.f_recogida.toString().split("-")

      horaSeleccionada.setFullYear(Number(anioMesDia[0])) // Le añado el año...
      horaSeleccionada.setMonth(Number(anioMesDia[1]) - 1) // ...el mes... (se resta 1 porque enero es el mes 0)
      horaSeleccionada.setDate(Number(anioMesDia[2])) // ...el día...
      horaSeleccionada.setHours(Number(horaMinuto[0])) // ...la hora...
      horaSeleccionada.setMinutes(Number(horaMinuto[1])) // ...y los minutos

      if(horaSeleccionada < horaActual){
        this.alertHoraEntrega=false
        this.alertHoraNoValida=true
      }
    }
    if(!this.createDonation.cp){
      this.alertCPEntrega=true;
      this.alertMsg="Campo obligatorio."
    } else if(!this.checkCP(this.createDonation.cp)) {
      this.alertCPEntrega=true;
      this.alertMsg="Formato no válido."
    } else {
      this.alertCPEntrega=false
      if(!this.alertHoraNoValida&&this.createDonation.nombre&&this.createDonation.descripcion&&this.createDonation.direccion&&this.createDonation.cp&&this.createDonation.f_recogida&&this.createDonation.h_recogida){
        this.createDonation.alergenos = JSON.stringify(this.alergenosChecked);
        this.createDonation.id_usuario = this.idUsuario;
        if(!this.donando){  // Se está creando una oferta nueva
          this._donarService.register(this.createDonation).subscribe({
            next:data => {
              this.idDonacion=data[0].id_oferta
            }
          })
        } else {
          this._donarService.updateOferta(
              this.createDonation
          ).subscribe({
            next:data => {
              this.idDonacion=data[0].id_oferta
            }
          })
        }
        this.showModal=true
      }
    }
  }

  // Validad raciones
  checkRation():void {
    if(this.createDonation.raciones<1){
      this.createDonation.raciones=1
    }
  }

  // Validar CP
  checkCP(input:any) {
    let regex = /^(?:0?[1-9]|[1-4]\d|5[0-2])\d{3}$/g
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

  // Eliminar de alergenosChecked los alergenos deseleccionados
  checkChecked(alergeno:string){
    if(!this.alergenosChecked[alergeno]){
      delete this.alergenosChecked[alergeno];
    }
  }

}
