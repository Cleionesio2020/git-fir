import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, Observable, switchMap, debounceTime, distinctUntilChanged, shareReplay, Subject, of } from 'rxjs';
import { GuardaModell } from 'src/app/models/GuarrdaModel';
import { AutocompleteService } from 'src/app/sevices/autocomplete.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})

export class AutocompleteComponent implements OnInit {

  constructor(private service: AutocompleteService) { }
  filteredOptions$!: Observable<GuardaModell[]>;
  @Output() selected = new EventEmitter<GuardaModell>()
  private searchTerm = new Subject<string>();

  ngOnInit(): void {
      this.filteredOptions$ = this.searchTerm.pipe(
        shareReplay(1),
        startWith(''),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((item) => this.service.getGuardaPorNome(item)
        )
      )
  }



  search(term: string): void {
    this.searchTerm.next(term);
  }

  onSelected(selectedItem: MatAutocompleteSelectedEvent): void {
    const guardaSelecionado: GuardaModell = selectedItem.option.value;
    console.log(guardaSelecionado)
    this.selected.emit(guardaSelecionado);
  }

  displayFn(guarda: GuardaModell): string {
    return guarda && guarda.nome ? guarda.nome : '';
  }

}
