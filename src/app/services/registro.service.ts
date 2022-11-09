import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('elika_waste:elika123')
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(public _http:HttpClient) { }

  newAccount(datos:any):Observable<any> {
    return this._http.post('http://elika-waste.learnhowto.space/api/api_usuario.php',datos,httpOptions);
  }
}
