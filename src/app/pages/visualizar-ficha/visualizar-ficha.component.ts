import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common'
import { LancamentoService } from 'src/app/sevices/Lancamento.service';
import { LancamentoModell } from 'src/app/models/LancamentoModell';

@Component({
  selector: 'app-visualizar-ficha',
  templateUrl: './visualizar-ficha.component.html',
  styleUrls: ['./visualizar-ficha.component.css']
})
export class VisualizarFichaComponent implements OnInit {
  lancamento!: LancamentoModell

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id')
      if (id) {
        this.lancamentoService.carregaLancamentoPorid(Number(id)).subscribe(
          resp => this.lancamento = resp
        )
      }
    })
  }

  paginaInicial() {
    this.location.back();
  }

}
