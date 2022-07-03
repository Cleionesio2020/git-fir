import { Component, OnInit } from '@angular/core';
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

  constructor(private rourer: Router, private loginService: LoginService) { }

  ngOnInit(): void {}

  logar() {
    console.log(this.user)

    this.loginService.logar(this.user).subscribe(
      data =>{
        if(data?.accessToken){
          localStorage.setItem('accessToken',data.accessToken)
          this.rourer.navigate(['inicial'])
        }
      }
    )
  }

}
