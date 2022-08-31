import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GuardaModell } from '../models/GuarrdaModel';

@Injectable({
  providedIn: 'root'
})
export class GuardaService {

  baseURL: string = "http://localhost:8080";
  private guardaSelecionado!: GuardaModell;

  constructor(private http: HttpClient) { }


  getAllGuardas(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/api/guarda/all`)
  }

  getbyId(bmGuarda:string): Observable<GuardaModell> {
    return this.http.get<GuardaModell>(`${this.baseURL}/api/guarda/${bmGuarda}`)
  }

  public getGuardaSelecionado(): GuardaModell {
    return this.guardaSelecionado
  }

  public setGuardaSelecionado(guarda: GuardaModell) {
    this.guardaSelecionado = guarda
  }

}
