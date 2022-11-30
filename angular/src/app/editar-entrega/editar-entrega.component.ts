import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { DonarService } from '../services/donar.service';
import { CookieService } from 'ngx-cookie-service';
import { DonarFormularioComponent } from '../donar-formulario/donar-formulario.component';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-entrega',
  templateUrl: './editar-entrega.component.html',
  styleUrls: ['./editar-entrega.component.scss'],
  providers: [DonarFormularioComponent, DatePipe]
})
export class EditarEntregaComponent implements OnInit {
  constructor(
    private _loginService:LoginService, 
    private _donarService:DonarService, 
    public donarFormularioComponente:DonarFormularioComponent,
    private router:Router, 
    private _cookie:CookieService
  ) {
  }

  ngOnInit(): void {
  }

}
