import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

declare var bootstrap:any;

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})
export class AyudaComponent implements OnInit {

  public loading:boolean=false

  constructor(private router:Router, private _cookie:CookieService) {
  }

  ngOnInit(): void {
    this.tooltipInit()
    setTimeout(()=>{
      this.loading=true
    }, 400);
  }

  // Inicializr bootstrap tooltip
  tooltipInit():void {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }

}
