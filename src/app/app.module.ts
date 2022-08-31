import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InicialComponent } from './pages/inicial/inicial.component';
import { MainComponent } from './layout/main/main.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { LoginComponent } from './pages/admin/login/login.component';
import { NovoRegistroComponent } from './pages/novo-registro/novo-registro.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptors/interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './componentes/loading/loading/loading.component';
import { LoginService } from './sevices/login.service';
import { LoadingService } from './sevices/loading.service';
import { AutocompleteComponent } from './componentes/autocomplete/autocomplete/autocomplete.component';
import { AutocompleteService } from './sevices/autocomplete.service';
import { DialogComponent } from './componentes/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { VisualizarFichaComponent } from './pages/visualizar-ficha/visualizar-ficha.component';
import { MatSelectModule } from '@angular/material/select';
import { LancamentoService } from './sevices/Lancamento.service';
import { DatePipe } from '@angular/common';
import { DefinicoesComponent } from './pages/definicoes/definicoes.component';
import { EditarenovoComponent } from './pages/definicoes/editarenovo/editarenovo.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserService } from './sevices/user.service';
import { StarsComponent } from './componentes/stars/stars.component';
import { VisializarTodosComponent } from './pages/visializar-todos/visializar-todos.component';


@NgModule({
  declarations: [
    AppComponent,
    InicialComponent,
    MainComponent,
    LoginComponent,
    NovoRegistroComponent,
    LoadingComponent,
    AutocompleteComponent,
    DialogComponent,
    VisualizarFichaComponent,
    DefinicoesComponent,
    EditarenovoComponent,
    StarsComponent,
    VisializarTodosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CdkAccordionModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [
    LoginService,
    LoadingService,
    AutocompleteService,
    LancamentoService,
    UserService,
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
