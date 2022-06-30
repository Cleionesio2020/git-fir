import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardaService {

  baseURL: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }
  


  /** TENTA FAZER O LOGIN NO BAKEND */
  getAllGuardas(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/api/guarda/all`)
  }
}
