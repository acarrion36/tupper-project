import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  public loginStatus:any

  constructor(private _loginService:LoginService) {}

  ngOnInit(): void {
    this.loginStatus=this._loginService.getLoginStatus()
  }

  mostrar():void {
    if(this.loginStatus) {
      this._loginService.setloginWindowStatus(false)
      this._loginService.setlogoutWindowStatus(true)
    } else {
      this._loginService.setlogoutWindowStatus(false)
      this._loginService.setloginWindowStatus(true)
    }
  }

}
