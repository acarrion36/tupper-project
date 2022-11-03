import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginWStatus$=new BehaviorSubject<boolean>(false)
  private logoutWStatus$=new BehaviorSubject<boolean>(false)
  private loginUStatus$=new BehaviorSubject<boolean>(false)
  private alertIStatus$=new BehaviorSubject<boolean>(true)

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

  // Controla si el usuario ha rellenado la informacion personal obligatoria
  get alertInfoStatus$():Observable<boolean> {
    return this.alertIStatus$.asObservable()
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

  setalertInfoStatus(status:boolean):void {
    this.alertIStatus$.next(status)
  }

  readUsers():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('elika_waste:elika123')
      })
    };
    return this._http.get("https://elika-waste.learnhowto.space/api/api_usuario.php",httpOptions)
  }

}
