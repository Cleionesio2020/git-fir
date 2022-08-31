import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { LancamentoModell } from '../models/LancamentoModell';
import { tipoLancamento } from '../models/TipoLancamento';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  baseURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  public salvaLancamento( lancamento: LancamentoModell ): Observable<LancamentoModell> {
    return this.http.post<LancamentoModell>(`${this.baseURL}/api/lancamento`, lancamento)
  }

 lancametoDoGuarda(bmParem:string | null):Observable<LancamentoModell[]>{
    //http://localhost:8080/api/lancamento/query_bm?param=87134-x
   return  this.http.get<LancamentoModell[]>(`${this.baseURL}/api/lancamento/query_bm?param=${bmParem}`)

  }

  //CARREGA UM LANCAMENTO PELO ID DO LANCAMENTO
  public carregaLancamentoPorid( idLancamento: number ): Observable<LancamentoModell> {
    return this.http.get<LancamentoModell>(`${this.baseURL}/api/lancamento/${idLancamento}`)
  }


  getDadosCombo():Observable<tipoLancamento[]>{
    return  this.http.get<tipoLancamento[]>("assets/dataComboLancamentos.json");
  }
}
