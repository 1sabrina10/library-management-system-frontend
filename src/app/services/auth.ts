import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/auth';

  login(data: LoginRequest) {
  return this.http.post<AuthenticationResponse>(
    `${this.apiUrl}/login`,
    data
  );
}

register(data: RegisterRequest) {

  return this.http.post(
    `${this.apiUrl}/register`,
    data
  );

}

}


