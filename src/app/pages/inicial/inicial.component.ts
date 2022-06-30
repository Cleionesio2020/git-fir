import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DialogComponent } from 'src/app/componentes/dialog/dialog.component';
import { GuardaModell } from 'src/app/models/GuarrdaModel';
import { GuardaService } from 'src/app/sevices/guarda.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})

export class InicialComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private guardaService: GuardaService,
    private router:Router
    ) { }
  guardaSelecionado: any

  ngOnInit() {

  }

//navega pra rota ao clicar no botao
carregarPagina(param:string){
  this.router.navigate([`/${param}`]);
}

  onSelected(event: GuardaModell) {
    this.guardaSelecionado = event
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: "Tem certeza qu quer renover este registro?",
        buttonText:{ok:"Ok", cancel:"Cancelar"}
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log(confirmed)
    });

  }
}
