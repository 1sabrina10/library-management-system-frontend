
import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { LoanService } from '../../../services/loan';
import { Loan } from '../../../models/loan';
import { TokenService } from '../../../services/token';

@Component({
  selector: 'app-loan-detail',
  imports: [],
  templateUrl: './loan-detail.html',
  styleUrl: './loan-detail.css'
})
export class LoanDetail implements OnInit {

  private loanService = inject(LoanService);
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private tokenService = inject(TokenService);

  loan: Loan | null = null;

  loading = false;

  errorMessage = '';

  isAdmin(): boolean {

    const role = this.tokenService.getRole();

    return role === 'ADMIN' || role === 'ROLE_ADMIN';

  }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log(
      'ID de l’emprunt :',
      id
    );

    if (!id) {

      this.errorMessage =
        'ID de l’emprunt invalide';

      this.cdr.detectChanges();

      return;
    }

    this.loanService
      .getLoanById(id)
      .subscribe({

        next: (data) => {

          console.log(
            'Emprunt reçu depuis le backend :',
            data
          );

          this.loan = data;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Erreur récupération emprunt :',
            error
          );

          this.errorMessage =
            'Impossible de charger l’emprunt.';

          this.cdr.detectChanges();

        }

      });

  }

  retournerLivre(): void {

    if (!this.loan) {
      return;
    }

    this.loading = true;

    this.loanService
      .returnLoan(this.loan.id)
      .subscribe({

        next: (response) => {

          console.log(
            'Livre retourné :',
            response
          );

          if (this.loan) {

            this.loan.loanStatus =
              'RETURNED';

            this.loan.returnDate =
              response.returnDate;

          }

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Erreur retour du livre :',
            error
          );

          this.errorMessage =
            'Impossible de retourner le livre.';

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }

}

