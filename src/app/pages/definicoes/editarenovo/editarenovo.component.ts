import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GuardaModell } from 'src/app/models/GuarrdaModel';
import { UserModell } from 'src/app/models/UserModel';
import { GuardaService } from 'src/app/sevices/guarda.service';
import { UserService } from 'src/app/sevices/user.service';

@Component({
  selector: 'app-editarenovo',
  templateUrl: './editarenovo.component.html',
  styleUrls: ['./editarenovo.component.css']
})
export class EditarenovoComponent implements OnInit {
  userAEditar!: UserModell
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private guardaService: GuardaService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      res => {
        if (res.get('id')) {
          this.userService.getAllUserById(Number(res.get('id'))).subscribe(
            res => {
              this.userAEditar = res
              this.configForm();
            }
          )
        } else {
          this.initUser();
          this.configForm();
        }
      }
    )



  }

  onSelected(event: GuardaModell) {
    if (event) {
      this.guardaService.setGuardaSelecionado(event)
      this.userAEditar.name = event.nome;
      this.userAEditar.email = event.email;
      this.userAEditar.username = event.bm;
      this.configForm();
    }
  }

  configForm() {
    this.formGroup = this.fb.group({
      name: [this.userAEditar.name,Validators.minLength(6)],
      email: [this.userAEditar.email, Validators.email],
      username: [this.userAEditar.username,Validators.minLength(6)],
      password: ['',Validators.minLength(6)],
      comfirmPassword: ['',Validators.minLength(6)],
      roles: this.fb.group({
        ADMIN: false,
        USER1: false,
        USER2: false,
        USER3: false,
      })
    })
  }

  initUser() {
    this.userAEditar = { name: '', username: '', email: '', password: '', comfirmPassword: '', roles: [] }
  }

  onSubmit() {
    console.log(this.formGroup)
  }


}
