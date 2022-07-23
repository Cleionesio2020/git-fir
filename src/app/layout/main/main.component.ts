import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModell } from 'src/app/models/UserModel';
import { LoginService } from 'src/app/sevices/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userLogado!:UserModell;
  opened = true
  constructor(
    private router: Router,
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
    this.loginService.getUserLogado().subscribe(
      res=>this.userLogado=res
    )
  }

  logout() {
    this.loginService.setUserLogado({})
    localStorage.removeItem('userLogado')
    this.router.navigate(['login'])
  }

}
