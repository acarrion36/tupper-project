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

  private url$:string="http://elika-waste.learnhowto.space/php/api/api_oferta.php"

  constructor(private _http:HttpClient) { }

  readAllDonations():Observable<any>{
    return this._http.get(this.url$,httpOptions)
  }

    readDonationsByIdu(idu:any):Observable<any>{
      return this._http.get(this.url$+"?idu="+idu,httpOptions)
    }

  register(donation:any):Observable<any>{
    return this._http.post(this.url$,donation,httpOptions)
  }

  delete(id:any):Observable<any>{
    return this._http.post(this.url$+"?idu="+id,httpOptions)
  }

}
