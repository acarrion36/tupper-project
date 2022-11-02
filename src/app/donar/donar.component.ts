import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

declare var bootstrap:any;

@Component({
  selector: 'app-donar',
  templateUrl: './donar.component.html',
  styleUrls: ['./donar.component.scss']
})
export class DonarComponent implements OnInit {

  public loginStatus$:any

  constructor(private _loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    // Inicializamos Bootstrap Tooltip
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    if(!this.loginStatus$) {
      this.router.navigate(['/'])
      this._loginService.setloginWindowStatus(true)
    }
  }

}
