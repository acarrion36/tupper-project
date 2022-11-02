import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginWStatus$=new BehaviorSubject<boolean>(false)
  private logoutWStatus$=new BehaviorSubject<boolean>(false)
  private loginUStatus$=new BehaviorSubject<boolean>(false)
  private personalIStatus$=new BehaviorSubject<boolean>(false)

  constructor(public _http : HttpClient) { }

  // Controla la visibilidad del componente login
  get loginWindowStatus$():Observable<boolean> {
    return this.loginWStatus$.asObservable()
  }

  // Controla la visibilidad del componente logout
  get logoutWindowStatus$():Observable<boolean> {
    return this.logoutWStatus$.asObservable()
  }

  // Controla si el usuario esta logeado
  get loginStatus$():Observable<boolean> {
    return this.loginUStatus$.asObservable()
  }

  // Controla si el usuario ha rellenado todos los datos obligatorios en el perfil
  get personalInfoStatus$():Observable<boolean> {
    return this.personalIStatus$.asObservable()
  }

  setloginWindowStatus(status:boolean):void {
    this.loginWStatus$.next(status)
  }

  setlogoutWindowStatus(status:boolean):void {
    this.logoutWStatus$.next(status)
  }

  setloginStatus(status:boolean):void {
    this.loginUStatus$.next(status)
  }

  setpersonalInfoStatus(status:boolean):void {
    this.personalIStatus$.next(status)
  }

}
