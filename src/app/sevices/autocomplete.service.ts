import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  of,
  catchError,
} from 'rxjs';
import { GuardaModell } from '../models/GuarrdaModel';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  baseURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  /** TENTA FAZER O LOGIN NO BAKEND */
  getGuardaPorNome(term: string): Observable<GuardaModell[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<GuardaModell[]>(
        `${this.baseURL}/api/guarda/nome_guarda?nome_guarda=${term}`
      )
      .pipe(
        catchError((erro) => {
          return of([]);
        })
      );
  }
}
