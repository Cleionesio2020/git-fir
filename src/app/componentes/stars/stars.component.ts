import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {

  totalEstrela:number = 0 ;
  meiaEstrela = false
  arrayEstrela:number[]
  @Input() pontos!:number;

  constructor() {

    this.arrayEstrela = []
  }

  ngOnInit(): void {

  }

 ngOnChanges(changes: SimpleChanges): void {
  this.arrayEstrela = []
  this.totalEstrela = 0 ;
  this.gerarCode(this.pontos)
  console.log("changed ", this.pontos)
 }




  gerarCode(pontos: number) {

    for (var i = 1; i <= pontos; i++) {
      this.arrayEstrela.push(i)
      this.totalEstrela +=1
    }
    if (this.totalEstrela < pontos && this.totalEstrela < pontos + 1) {
      this.meiaEstrela=true
    } else {
      this.meiaEstrela=false
    }

    console.log(this.arrayEstrela)
    console.log(this.totalEstrela)
  }



}
