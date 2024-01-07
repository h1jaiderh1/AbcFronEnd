import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseApi } from '../Interfaces/response-api';
import { Pedido } from '../Interfaces/pedido';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private urlApi:string = environment.endpoint + "Pedido/"


  constructor(private http:HttpClient) { }

  registrar(request:Pedido):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}Registrar`, request)
  }

}
