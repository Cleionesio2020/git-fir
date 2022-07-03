import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-visualizar-ficha',
  templateUrl: './visualizar-ficha.component.html',
  styleUrls: ['./visualizar-ficha.component.css']
})
export class VisualizarFichaComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location ) { }

  ngOnInit(): void {
  }

  paginaInicial(){
    this.location.back();
 }

}
