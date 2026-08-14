import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from '../../../services/loan';
import { LoanRequest } from '../../../models/LoanRequest';
import { BookService } from '../../../services/book';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-loan-create',
  imports: [
    FormsModule
  ],
  templateUrl: './loan-create.html',
  styleUrl: './loan-create.css'
})
export class LoanCreate implements OnInit {

  private loanService = inject(LoanService);
  private bookService = inject(BookService);
  private router = inject(Router);

  bookId = 0;
  books: Book[] = [];

  loading = false;
  errorMessage = '';

  ngOnInit(): void {

    this.bookService.getBooks()
      .subscribe({
        next: (data) => {
          this.books = data;
          console.log('Livres reçus', data);
        },
        error: (error) => {
          console.error('Erreur livres', error);
          this.errorMessage = "Impossible de charger la liste des livres";
        }
      });
  }

  ajouterEmprunt(): void {

    if (this.bookId === 0) {
      this.errorMessage = "Veuillez sélectionner un livre";
      return;
    }

    const loan: LoanRequest = {
      bookId: this.bookId
    };

    console.log('Données envoyées :', loan);

    this.loading = true;
    this.errorMessage = '';

    this.loanService.addLoan(loan)
      .subscribe({
        next: (response) => {
          console.log('Emprunt ajouté', response);
          this.loading = false;
          this.router.navigate(['/loans']);
        },
        error: (error) => {
          console.error('Erreur ajout emprunt', error);
          this.loading = false;

          if (error.status === 400) {
            this.errorMessage = "Ce livre n'est pas disponible ou les données sont invalides";
          } else if (error.status === 401) {
            this.errorMessage = "Vous devez être connecté";
          } else if (error.status === 404) {
            this.errorMessage = "Livre introuvable";
          } else {
            this.errorMessage = "Erreur lors de la création de l'emprunt";
          }
        }
      });
  }
}