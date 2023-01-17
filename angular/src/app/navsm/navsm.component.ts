import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

declare var bootstrap:any;

@Component({
  selector: 'app-navsm',
  templateUrl: './navsm.component.html',
  styleUrls: ['./navsm.component.scss']
})
export class NavsmComponent implements OnInit {

  constructor(private _loginService:LoginService) { }

  ngOnInit(): void {
    this.tooltipInit()
  }

  // Inicializr bootstrap tooltip
  tooltipInit():void {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }


}
