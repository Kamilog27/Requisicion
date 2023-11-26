import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Oficina } from './interfaces/office.interface';
import { TipoRequision } from './interfaces/tipoRequisicion.interface';
import { Key } from './interfaces/key.interface';
import { Area } from './interfaces/area.interface';
import { Requisiciones } from './interfaces/requisiciones.interfaces';
import { Usuarios } from './interfaces/usuarios.interface';
import { Productos } from './interfaces/productos.interface';



@Injectable({
  providedIn: 'root'
})
export class RequisicionService {
  baseUrl:string=environment.baseUrl;
  constructor(private http:HttpClient) { }


  getListRequisiciones():Observable<Requisiciones[]>{
    return this.http.get<Requisiciones[]>(`${this.baseUrl}/Requisiciones/ListarRequisiciones?key=3xp1nn`);
  }
  getRequisicion(codigoRequisicion:number):Observable<Requisiciones>{
    return this.http.get<Requisiciones>(`${this.baseUrl}/Requisiciones/ConsultarRequisicion?key=3xp1nn&pcod_requisicion=${codigoRequisicion}`);

  }
  getListOffice():Observable<Oficina[]>{
    return this.http.get<Oficina[]>(`${this.baseUrl}/Requisiciones/ListarOficina?key=3xp1nn`);
  }
  getTipoRequisicion():Observable<TipoRequision[]>{
    return this.http.get<TipoRequision[]>(`${this.baseUrl}/TipoRequisicion/listarTipoRequisicion?key=3xp1nn`);
  }
  getArea():Observable<Area[]>{
    return this.http.get<Area[]>(`${this.baseUrl}/Requisiciones/ListarArea?key=3xp1nn`);
  }
  getUsuarios():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.baseUrl}/Requisiciones/ListarUsuarios?key=3xp1nn`); 
  }
  getProductos(codProducto):Observable<Productos[]>{
    return this.http.get<Productos[]>(`${this.baseUrl}/Requisiciones/ListarProductosPorTipodeRequisicion?key=3xp1nn&pCodTipoRequisicion=${codProducto}`); 
  }
  
  postRequisicion(formulario:Requisiciones){
    return this.http.post<Requisiciones>(`${this.baseUrl}/Requisiciones/CrearRequisicion?key=3xp1nn`,formulario);
  }
  deleteRequisicion(codigoRequisicion:number){
    return this.http.post(`${this.baseUrl}/Requisiciones/EliminarRequisicion?key=3xp1nn&codigo=${codigoRequisicion}`,codigoRequisicion);
  }
  generarKey(key:Key):string {
    const firmaTiempo = Math.floor(Date.now()/1000);
    const datosFirma = `${firmaTiempo};${"CP_Contabilidad"}`;
    var firma = btoa(datosFirma);

    const data = {
      key: key.key,
      sign: firma
    };

    const jsonString = JSON.stringify(data);
    const objetoFirmado = btoa(jsonString);
    return objetoFirmado;
  }
}
