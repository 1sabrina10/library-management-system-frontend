import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private authService = inject(AuthService);
  private router = inject(Router);

  firstname = '';
  lastname = '';
  email = '';
  password = '';

  inscrire() {

    const data = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    };

    this.authService.register(data).subscribe({

      next: (response) => {

  console.log('Inscription réussie', response);

  this.router.navigate(['/login']);

},

      error: (error) => {
        console.error('Erreur inscription', error);
      }

    });

  }

}