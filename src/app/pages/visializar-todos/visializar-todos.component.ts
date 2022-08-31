import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LancamentoModell } from 'src/app/models/LancamentoModell';
import { LancamentoService } from 'src/app/sevices/Lancamento.service';

@Component({
  selector: 'app-visializar-todos',
  templateUrl: './visializar-todos.component.html',
  styleUrls: ['./visializar-todos.component.css']
})
export class VisializarTodosComponent implements OnInit {
lancamentos:LancamentoModell[]=[]
  constructor(
    private location:Location,
    private router: Router,
    private route: ActivatedRoute,
    private lancamentoService:LancamentoService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let bmGuarda = params.get('id')
      if (bmGuarda) {
          this.lancamentoService.lancametoDoGuarda (bmGuarda).subscribe(
          resp =>  {
            this.lancamentos = resp
            console.log(this.lancamentos)
          }
        )
      }
    })

  }

  paginaInicial() {
    this.location.back();
  }
}
