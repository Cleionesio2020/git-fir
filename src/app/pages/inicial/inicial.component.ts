import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DialogComponent } from 'src/app/componentes/dialog/dialog.component';
import { GuardaModell } from 'src/app/models/GuarrdaModel';
import { LancamentoModell } from 'src/app/models/LancamentoModell';
import { GuardaService } from 'src/app/sevices/guarda.service';
import { LancamentoService } from 'src/app/sevices/Lancamento.service';
import { environment } from 'src/environments/environment';

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
    private lancamentoService: LancamentoService,
    private guardaService: GuardaService
  ) { }
  IMAGES_AVATAR = environment.IMAGES_AVATAR
  guardaSelecionado!: any;
  lancamentos!: Array<LancamentoModell>;
  totalpontos: number = 0

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this.lancamentoService
          .lancametoDoGuarda(params.get('id'))
          .subscribe((resp) => {
            if (resp.length > 0) {
              console.log("resp" + resp)
              this.lancamentos = resp;
              this.guardaSelecionado = this.lancamentos[0].fir?.guarda;
              this.setatotalPonto(this.lancamentos)
            } else {
              const state = window.history.state
              if (state.navigationId > 1) {
                this.lancamentos = []
                this.guardaSelecionado = state
              }
            }
          });
      } else {
        this.guardaSelecionado = null;
        this.lancamentos = []
      }
    });
  }

  //navega pra rota ao clicar no botao
  carregarPagina(param: any) {
    this.router.navigate([`/novo/editar/${param}`]);
  }

  //NAVEGA PARA A PAGINA AO CLICAR NO BOTAO NOVO REGISTRO
  carregarPaginaEditar(param: any) {
    this.router.navigate([`/novo/novo/${param}`]);
  }

  //navega pra rota ao clicar no botao visualizar
  carregarPaginavisualizar(param: any) {
    this.router.navigate([`/visualizar/${param}`]);
  }

  //navega pra rota ao clicar no botao visualizar todos
  carregarPaginavisualizarTodos() {
    this.router.navigate([`/visualizar-todos/${this.lancamentos[0].fir.guarda.bm}`]);
  }

  onSelected(event: GuardaModell) {
    if (event) {
      this.totalpontos=0;
      this.guardaService.setGuardaSelecionado(event);
      this.router.navigate([`inicial/${event.bm}`], { state: event });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'Você tem certeza que quer remover este registro?',
        buttonText: { ok: 'Ok', cancel: 'Cancelar' },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log(confirmed);
    });
  }

  setatotalPonto(arrayLanncamento: LancamentoModell[]) {
    arrayLanncamento.forEach(lancamento => {
      this.totalpontos = + lancamento.tipoLancamento.pontos
    })
  }
}

