import { Component, OnInit,ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-novo-registro',
  templateUrl: './novo-registro.component.html',
  styleUrls: ['./novo-registro.component.css']
})
export class NovoRegistroComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
