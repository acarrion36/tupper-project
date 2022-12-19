// FILES SERVICE
// Servicio dedicado a la subida de fotos

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FilesService {

  constructor(private _http:HttpClient) { }

  post(data:any):Observable<any>{
    return this._http.post("https://api.imgbb.com/1/upload?key=d37aa5fb934e247dcd603fd443266f8e",data)
  }

  delete(data:any):Observable<any>{
    return this._http.delete("https://api.imgbb.com/1/upload?key=d37aa5fb934e247dcd603fd443266f8e",data)
  }

}
