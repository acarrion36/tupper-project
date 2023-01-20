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

  private url$:string="https://elika-waste.learnhowto.space/php/api/api_demanda.php"

  constructor(private _http:HttpClient) { }

  /**** READ ****/
    // Todas las demandas
    readAllDemands():Observable<any>{
      return this._http.get(this.url$,httpOptions)
    }

    // 1 demanda por ID demanda
    readDemandasByIdd(idd:any):Observable<any>{
      return this._http.get(this.url$+"?idd="+idd,httpOptions)
    }

    // Todas las demandas de un usuario (por ID usuario)
    readDemandasByIdu(idu:any):Observable<any>{
      return this._http.get(this.url$+"?idu="+idu,httpOptions)
    }

    // Raciones reservadas/solicitadas/demandadas de un plato
    readRacionesByIdo(ido:any):Observable<any>{
      return this._http.get(this.url$+"?rido="+ido,httpOptions)
    }

  /**** POST ****/
  post(demand:Demand):Observable<any>{
    return this._http.post(this.url$,demand,httpOptions)
  }

  /**** UPDATE ****/
  update(demand:any):Observable<any>{
    return this._http.put(this.url$,demand,httpOptions)
  }

  /**** DELETE ****/
  delete(id:any):Observable<any>{
    return this._http.delete(this.url$+"?id="+id,httpOptions)
  }

}
