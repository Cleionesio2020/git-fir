import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/sevices/login.service';
import { UserModell } from '../../../models/UserModel'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: UserModell = {
    username: "",
    password: ""

  }

  constructor(
    private rourer: Router,
    private loginService: LoginService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  logar() {
    if (this.validaLogin(this.user)) {
      this.loginService.logar(this.user).subscribe(
        data => {
          if (data?.accessToken) {
            localStorage.setItem('userLogado', JSON.stringify(data))
            this.rourer.navigate(['inicial'])
          }
        },
        error => {
          console.log(error.error.status)
          if (error.status === 0) {
            this.showMessage("Servidor não está respondendo")
          }else if(error.error.status){
            this.showMessage("Usuário e (ou) senha inválidos")
          } else{
            this.showMessage("Erro: "+error.message)
          }
        }
      )
    }

  }

  showMessage(message: string) {
    this._snackBar.open(message, "ok", { duration: 3000, verticalPosition: 'top', horizontalPosition: 'end' })

  }

  validaLogin(user: UserModell): boolean {
    console.log(user.username!.trim().length)
    if (user.username!.trim().length < 6 || user.password!.trim().length < 6) {
      this.showMessage("usuário e senha, deve ter no míminimo 6 caracteres")
      return false
    } else {
      return true
    }
  }

}
