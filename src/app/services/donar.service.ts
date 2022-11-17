// DONAR SERVICE
// Servicio dedicado a las donaciones

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('elika_waste:elika123')
  })
};

@Injectable({
  providedIn: 'root'
})

export class DonarService {

  constructor(private _http:HttpClient) { }

  register(donation:any):Observable<any>{
    return this._http.post("http://elika-waste.learnhowto.space/api/api_oferta.php",donation,httpOptions)
  }

}
