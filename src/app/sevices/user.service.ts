import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModell } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllUsers():Observable<UserModell[]>{
    return this.http.get<UserModell[]>(`${this.baseURL}/api/user/all`);
  }

  getAllUserById(id:number):Observable<UserModell>{
    return this.http.get<UserModell>(`${this.baseURL}/api/user/${id}`);
  }


}
