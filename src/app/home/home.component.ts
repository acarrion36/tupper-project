import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public loginStatus$:any

  constructor(private _loginService:LoginService) {}

  ngOnInit(): void {
    this._loginService.loginStatus$.subscribe((status:boolean) => this.loginStatus$ = status)
  }

  mostrar():void {
    if(this.loginStatus$) {
      this._loginService.setloginWindowStatus(false)
      this._loginService.setlogoutWindowStatus(true)
    } else {
      this._loginService.setlogoutWindowStatus(false)
      this._loginService.setloginWindowStatus(true)
    }
  }

}
