
import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoanService } from '../../../services/loan';
import { Loan } from '../../../models/loan';
import { TokenService } from '../../../services/token';

@Component({
  selector: 'app-loan-list',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './loan-list.html',
  styleUrl: './loan-list.css'
})
export class LoanList implements OnInit {

  private loanService = inject(LoanService);
  private cdr = inject(ChangeDetectorRef);
  private tokenService = inject(TokenService);

  loans: Loan[] = [];

  isAdmin(): boolean {
    const role = this.tokenService.getRole();

    return role === 'ADMIN' || role === 'ROLE_ADMIN';
  }

  ngOnInit(): void {

    this.loanService.getLoans()
      .subscribe({

        next: (data: Loan[]) => {

          console.log('Emprunts reçus', data);

          this.loans = data;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Erreur récupération emprunts',
            error
          );

        }

      });

  }

  supprimerEmprunt(id: number): void {

    this.loanService.deleteLoan(id)
      .subscribe({

        next: () => {

          this.loans = this.loans.filter(
            loan => loan.id !== id
          );

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Erreur suppression emprunt',
            error
          );

        }

      });

  }

}

