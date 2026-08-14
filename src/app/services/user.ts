import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/users';

  getUsers() {

    return this.http.get<User[]>(
      this.apiUrl
    );

  }

  getUserById(id: number) {

    return this.http.get<User>(
      `${this.apiUrl}/${id}`
    );

  }

}