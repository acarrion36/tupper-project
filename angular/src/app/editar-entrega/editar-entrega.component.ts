import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { DonarService } from '../services/donar.service';
import { CookieService } from 'ngx-cookie-service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-entrega',
  templateUrl: './editar-entrega.component.html',
  styleUrls: ['./editar-entrega.component.scss']
})
export class EditarEntregaComponent implements OnInit {
  public id_entrega: number =0;

  constructor(private _loginService:LoginService, private _donarService:DonarService, private router:Router, private _cookie:CookieService, private ruta:ActivatedRoute) {
    this.ruta.params.subscribe(params=>{		
      this.id_entrega = params['id_entrega'];
    })
  }

  ngOnInit(): void {
  }

}
