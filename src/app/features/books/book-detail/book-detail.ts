
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { BookService } from '../../../services/book';
import { Book } from '../../../models/book';
import { TokenService } from '../../../services/token';

@Component({
  selector: 'app-book-detail',
  imports: [RouterLink],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail implements OnInit {

  private bookService = inject(BookService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private cdr = inject(ChangeDetectorRef);

  private tokenService = inject(TokenService);


  book: Book | null = null;

  loading = true;

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
      'ID du livre :',
      id
    );

    if (!id) {

      this.errorMessage =
        'ID du livre invalide';

      this.loading = false;

      this.cdr.detectChanges();

      return;

    }

    this.bookService
      .getBookById(id)
      .subscribe({

        next: (data) => {

          console.log(
            'Livre reçu depuis le backend :',
            data
          );

          this.book = data as Book;

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Erreur API livre :',
            error
          );

          this.errorMessage =
            'Impossible de charger le livre';

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }

  retour(): void {

    this.router.navigate(['/books']);

  }

  modifier(): void {

    if (this.book) {

      this.router.navigate([
        '/books/edit',
        this.book.id
      ]);

    }

  }

}

