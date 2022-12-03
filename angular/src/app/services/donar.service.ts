// DONAR SERVICE
// Servicio dedicado a las donaciones

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Donation } from '../models/Donation';

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

  // Todas las donaciones
  readAllDonations():Observable<any>{
    return this._http.get(this.url$,httpOptions)
  }

  // Donaciones por USUARIO
  readDonationsByIdu(idu:any):Observable<any>{
    return this._http.get(this.url$+"?idu="+idu,httpOptions)
  }

  // Donaciones por OFERTA
  readDonationsByIdd(ido:any):Observable<any>{
    return this._http.get(this.url$+"?ido="+ido,httpOptions)
  }

  register(donation:Donation):Observable<any>{
    return this._http.post(this.url$,donation,httpOptions)
  }

  updateOferta(donation:any):Observable<any>{
    return this._http.put(this.url$+"?id="+donation.id_oferta,donation,httpOptions)
  }

  // Eliminar oferta
  delete_oferta(id:any):Observable<any>{    
    return this._http.delete(this.url$+"?id="+id,httpOptions)
  }

  delete(id:any):Observable<any>{
    return this._http.post(this.url$+"?idu="+id,httpOptions)
  }
  

}
