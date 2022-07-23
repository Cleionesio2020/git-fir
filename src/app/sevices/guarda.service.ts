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


  /** TENTA FAZER O LOGIN NO BAKEND */
  getAllGuardas(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/api/guarda/all`)
  }

  public getGuardaSelecionado(): GuardaModell {
    return this.guardaSelecionado
  }

  public setGuardaSelecionado(guarda: GuardaModell) {
    this.guardaSelecionado = guarda
  }

}
