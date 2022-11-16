// LOGIN SERVICE
// Servicio dedicado a los componentes login, logout, registro y perfil

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('elika_waste:elika123')
  })
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginWStatus$=new BehaviorSubject<boolean>(false)
  private logoutWStatus$=new BehaviorSubject<boolean>(false)
  private loginUStatus$=new BehaviorSubject<boolean>(false)
  private alertIStatus$=new BehaviorSubject<boolean>(true)

  constructor(private _http:HttpClient, private _cookie:CookieService) { }

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

  // COOKIES
  getToken() {
    return this._cookie.get("token")
  }

  setToken(token:string) {
    this._cookie.set("token",token,{expires:365})
  }

  // HTTP

  readUsers():Observable<any> {
    return this._http.get("http://elika-waste.learnhowto.space/api/api_usuario.php",httpOptions)
  }

  readUserByID(id:any):Observable<any> {
    return this._http.get("http://elika-waste.learnhowto.space/api/api_usuario.php?id="+id,httpOptions)
  }

  readUserByMail(loginMail:any):Observable<any> {
    const mail = {emx:loginMail}
    return this._http.post("http://elika-waste.learnhowto.space/api/api_usuario.php",mail,httpOptions)
  }

  readUserLogged():Observable<any> {
    const token = {emx:atob(this.getToken())}
    return this._http.post('http://elika-waste.learnhowto.space/api/api_usuario.php',token,httpOptions)
  }

  register(user:any):Observable<any>{
    return this._http.post("http://elika-waste.learnhowto.space/api/api_usuario.php",user,httpOptions)
  }

  update(id:any,user:any):Observable<any> {
    return this._http.put("http://elika-waste.learnhowto.space/api/api_usuario.php?id="+id,user,httpOptions)
  }

  delete(id:any):Observable<any> {
    return this._http.delete("http://elika-waste.learnhowto.space/api/api_usuario.php?id="+id,httpOptions)
  }

}
