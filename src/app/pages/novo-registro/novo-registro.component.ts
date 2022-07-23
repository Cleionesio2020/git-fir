import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardaModell } from 'src/app/models/GuarrdaModel';
import { LancamentoModell } from 'src/app/models/LancamentoModell';
import { tipoLancamento } from 'src/app/models/TipoLancamento';
import { GuardaService } from 'src/app/sevices/guarda.service';
import { LancamentoService } from 'src/app/sevices/Lancamento.service';

@Component({
  selector: 'app-novo-registro',
  templateUrl: './novo-registro.component.html',
  styleUrls: ['./novo-registro.component.css'],
})
export class NovoRegistroComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  lancamento!: LancamentoModell;
  guardaASerEditado!: GuardaModell;
  myForm!: FormGroup;
  statusDaPagian: string = '';
  dadosCobos$!: Observable<tipoLancamento[]>;

  constructor(
    private location: Location,
    private lancamentoService: LancamentoService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private guardaService: GuardaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.configuraAcaoAoReceberParametro();
    this.getDadosCombo();
  }

  onSubmit() {
    const value = this.myForm.value;
    const LancamentoASalvar = { ...this.lancamento };

    /*
    console.log(this.lancamento);
    this.lancamentoService.salvaLancamento(this.lancamento).subscribe(
      (resp) => console.log(resp),
      (erro) => console.log(erro)
    );
    */
  }

  configForm() {
    this.myForm = this.fb.group({
        dataLancamento: [this.lancamento.dataLancamento],
        tipoLancamentoModell: this.fb.group({
        descricao: [this.lancamento.tipoLancamento.descricao],
      }),

      firModell: this.fb.group({
        dataLancFir: [this.lancamento.fir?.data],
        sintese: [this.lancamento.fir?.sintese],
        origem: [this.lancamento.fir?.origem],

        DefesaModell: this.fb.group({
          dataDefesa: [this.lancamento.fir?.defesa?.dataDefesa],
          defesa: [this.lancamento.fir?.defesa?.defesa],
        }),
        DecisaoModell: this.fb.group({
          dataDecisao: [this.lancamento.fir?.decisao?.dataDecisao],
          decisao: [this.lancamento.fir?.decisao?.decisao],
        }),
      }),
    });
  }

  paginaInicial() {
    this.location.back();
  }

  //PEGA UM POSSIVEL OBGETO PASSADO NA ROTA
  public configuraAcaoAoReceberParametro(): void {

    this.route.paramMap.subscribe(
      (res => {
        if (res) {
          if (res.get('acao') === 'editar') {
            this.carregaLancametoParaEditar(Number(res.get('id')));
          } else {
            if (res.get('acao') === 'novo') {
              this.guardaASerEditado = this.guardaService.getGuardaSelecionado();
              this.lancamento = this.initLancamento();
              this.configForm();
            }
          }
        }
      })
    )
  }

  //CARREGA DADOS PRA PREENCHIMENTO DO COMBO
  getDadosCombo() {
    this.dadosCobos$ = this.lancamentoService.getDadosCombo();
  }

  //CARREGA UM LANCAMETO PELO ID DO LANCAMENTO PASSADO
  carregaLancametoParaEditar(idLancamento: number) {
    this.lancamentoService
      .carregaLancamentoPorid(idLancamento)
      .subscribe((res: LancamentoModell) => {
        this.lancamento = res;
        this.configForm();
      });
  }

  //INICIA UM LANCAMENTO VAZIO
  initLancamento(): LancamentoModell {
    const lancamento: LancamentoModell = {
      tipoLancamento: { tipo: '', descricao: '', pontos: 0 },
      dataLancamento: new Date(),
      fir: {
        data: null, origem: '', sintese: '',
        decisao: { dataDecisao: null, decisao: '' },
        defesa: { dataDefesa: null, defesa: '' },
        guarda: this.guardaASerEditado,
      }
    }
    return lancamento;
  }
}
