import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { TokenService } from '../../../services/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  motDePasse = '';

  loginError = false;

  seConnecter(): void {

    this.loginError = false;

    const data = {
      email: this.email,
      password: this.motDePasse
    };

    this.authService.login(data).subscribe({

      next: (response) => {

        this.tokenService.saveToken(response.token);

        this.router.navigate(['/']);

      },

      error: (error) => {

        console.error('Erreur de connexion :', error);

       
        this.loginError = true;

      }

    });

  }

}