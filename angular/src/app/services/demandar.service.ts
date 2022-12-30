// DEMANDAR SERVICE
// Servicio dedicado a las demandas (buscar/pedidos)

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Demand } from '../models/Demand';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('elika_waste:elika123')
  })
};

@Injectable({
  providedIn: 'root'
})

export class DemandarService {

  private url$:string="http://elika-waste.learnhowto.space/php/api/api_demanda.php"

  constructor(private _http:HttpClient) { }

  readAllDemands():Observable<any>{
    return this._http.get(this.url$,httpOptions)
  }

    readDemandasByIdd(idd:any):Observable<any>{
      return this._http.get(this.url$+"?idd="+idd,httpOptions)
    }

  post(demand:Demand):Observable<any>{
    return this._http.post(this.url$,demand,httpOptions)
  }

  delete(id:any):Observable<any>{
    return this._http.post(this.url$+"?id="+id,httpOptions)
  }

}
