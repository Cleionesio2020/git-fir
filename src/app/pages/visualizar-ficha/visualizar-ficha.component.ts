import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizar-ficha',
  templateUrl: './visualizar-ficha.component.html',
  styleUrls: ['./visualizar-ficha.component.css']
})
export class VisualizarFichaComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }

  paginaInicial(){
    this.router.navigate(['/']);
 }

}
