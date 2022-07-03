import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { DecisaoModell } from 'src/app/models/DecisaoModell';
import { FirModell } from 'src/app/models/FirModel';
import { LancamentoModell } from 'src/app/models/LancamentoModell';
import { tipoLancamento } from 'src/app/models/TipoLancamento';
import { UserModell } from 'src/app/models/UserModel';
import { LancamentoService } from 'src/app/sevices/Lancamento.service';


@Component({
  selector: 'app-novo-registro',
  templateUrl: './novo-registro.component.html',
  styleUrls: ['./novo-registro.component.css'],
})
export class NovoRegistroComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
 // tipoLancamento=['Elogio','Referência Elogiosa', 'Positiva','Negativa']
  lancamento!: LancamentoModell ;
  myForm!: FormGroup;
  statusDaPagian:string = ''
  dadosCobos$!: Observable<tipoLancamento[]>

  constructor(
    private location:Location,
    private lancamentoService:LancamentoService,
    private fb: FormBuilder,
    private route:ActivatedRoute) {}

  ngOnInit() {
    this.getTitulo()
    this.configForm();
    this.getDadosCombo();
  }

  onSubmit() {
    const value = this.myForm.value;
    this.lancamento = {
      tipoLancamento: value.tipoLancamento,
      dataLancamento:  value.dataLancamento.toLocaleDateString(),
      fir: {
        data:value.dataLancFir.toLocaleDateString(),
        origem: value.origem,
        sintese: value.sintese,
        defesa: { dataDefesa:value.dataDefesa.toLocaleDateString(), defesa: value.defesa },
        decisao: { dataDecisao:value.dataDecisao.toLocaleDateString(), decisao: value.decisao },
        guarda: { bm: '87134-x' },
      },
      userResponsavel:{
        id:1,
        username:'',
        password:''
      }
    };

console.log(this.lancamento)
    this.lancamentoService.salvaLancamento(this.lancamento).subscribe(
      resp=>console.log(resp)
      ,erro=>console.log(erro)
    )

  }

  configForm() {
    this.myForm = this.fb.group({
      dataLancamento:[new Date()],
      tipoLancamento:[ ''],

            dataLancFir:[''],
            sintese:[''],
            origem: [''],

            dataDefesa: [''],
            defesa: [''],

            dataDecisao: [''],
            decisao: [''],
    });
  }

  paginaInicial(){
    this.location.back();
 }

  //PEGA UM POSSIVEL OBGETO PASSADO NA ROTA
  public getTitulo(): void {
     this.route.queryParams.subscribe((res) => {
      console.log(res)
     this.statusDaPagian = res? 'EDITAR':'INSERIR'
     }
)}

//CARREGA DADOS PRA PREENCHIMENTO DO COMBO
getDadosCombo(){
 this.dadosCobos$ =  this.lancamentoService.getDadosCombo()
}

}
