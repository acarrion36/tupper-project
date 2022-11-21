import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss']
})
export class OpinionesComponent implements OnInit {

  public loginStatus$:any

  constructor(private _loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
    if(!this.loginStatus$) {
      this.router.navigate(['/'])
      this._loginService.setloginWindowStatus(true)
    }
  }

}
