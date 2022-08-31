import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModell } from 'src/app/models/UserModel';
import { UserService } from 'src/app/sevices/user.service';


@Component({
  selector: 'app-definicoes',
  templateUrl: './definicoes.component.html',
  styleUrls: ['./definicoes.component.css']
})
export class DefinicoesComponent implements OnInit {
  users!: UserModell[]
  displayedColumns: string[] = ['name', 'username', 'email', 'role', 'action'];
  //dataSource = ELEMENT_DATA;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      resp => {
        this.users = resp
      }
      ,respErro=>{
       if(respErro.error.status==403)
       alert("Não altorizado, a exibir este recurso")
       this.router.navigate(['/'])
      }
    )
  }

  editaUser(id:number) {
    this.router.navigate([`/edita_novo/${id}`])
  }

}
