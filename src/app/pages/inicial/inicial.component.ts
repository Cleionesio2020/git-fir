import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { DialogComponent } from 'src/app/componentes/dialog/dialog.component';
import { GuardaModell } from 'src/app/models/GuarrdaModel';
import { LancamentoModell } from 'src/app/models/LancamentoModell';
import { GuardaService } from 'src/app/sevices/guarda.service';
import { LancamentoService } from 'src/app/sevices/Lancamento.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css'],
})
export class InicialComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private lancamentoService:LancamentoService
  ) {}
  guardaSelecionado!: any;
  lancamentos!:LancamentoModell[]

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params){
        console.log(">>>>>>>>",params)
        this.lancamentoService.BuscaTodosLancametoGuarda(params.get('id')).subscribe(
          resp=>{
            if(resp){
             this.lancamentos = resp
             this.guardaSelecionado = this.lancamentos[0].fir?.guarda
            }
          }
        )
      }else{
        this.guardaSelecionado=null;
      }
    });

  }
  //navega pra rota ao clicar no botao
  carregarPagina(param: string) {
    console.log(param)
    this.router.navigate([`/${param}/editar/2`]);
  }

  carregarPaginaEditar(param:string) {
    this.router.navigate([`/novo/novo/${param}`]);
  }

  onSelected(event: GuardaModell) {
    if(event){
      this.router.navigate([`inicial/${event.bm}`]);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'Tem certeza qu quer renover este registro?',
        buttonText: { ok: 'Ok', cancel: 'Cancelar' },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log(confirmed);
    });
  }
}
