import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../services/book';
import { Book } from '../../../models/book';
import { TokenService } from '../../../services/token';

@Component({
  selector: 'app-book-list',
  imports: [
    RouterLink
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {

  private bookService = inject(BookService);
  private cdr = inject(ChangeDetectorRef);
  private tokenService = inject(TokenService);

  isAdmin = false;

  books: Book[] = [];

  ngOnInit(): void {

  this.isAdmin = this.tokenService.isAdmin();

  this.chargerLivres();

  }

  chargerLivres(): void {

    this.bookService.getBooks()
      .subscribe({

        next: (data: Book[]) => {

          this.books = data;

          console.log("Livres reçus", this.books);

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            "Erreur récupération livres",
            error
          );

        }

      });

  }

  supprimerLivre(id: number): void {

    this.bookService.deleteBook(id)
      .subscribe({

        next: () => {

          console.log("Livre supprimé");

          this.books = this.books.filter(
            book => book.id !== id
          );

        },

        error: (error) => {

          console.error(
            "Erreur suppression livre",
            error
          );

        }

      });

  }

}