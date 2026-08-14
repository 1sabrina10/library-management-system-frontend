import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book';
import { AuthorService } from '../../../services/author';
import { CategoryService } from '../../../services/category';
import { Author } from '../../../models/author';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-book-edit',
  imports: [
    FormsModule
  ],
  templateUrl: './book-edit.html',
  styleUrl: './book-edit.css'
})
export class BookEdit implements OnInit {


  private bookService = inject(BookService);

  private authorService = inject(AuthorService);

  private categoryService = inject(CategoryService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);


  id!: number;

  title = '';

  isbn = '';

  publicationYear = 2024;

  authorId = 0;

  categoryId = 0;

  authors: Author[] = [];

  categories: Category[] = [];

  ngOnInit(): void {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.authorService.getAuthors()
      .subscribe({

        next: (data) => {

          this.authors = data;

        },

        error: (error) => {

          console.error(error);

        }

      });


    this.categoryService.getCategories()
      .subscribe({

        next: (data) => {

          this.categories = data;

        },

        error: (error) => {

          console.error(error);

        }

      });


    this.bookService.getBookById(this.id)
      .subscribe({

        next: (book) => {

          this.title = book.title;

          this.isbn = book.isbn;

          this.publicationYear = book.publicationYear;

          this.authorId = book.authorId;

          this.categoryId = book.categoryId;

        },

        error: (error) => {

          console.error(error);

        }

      });


  }

  modifierLivre(): void {

    const book = {

      title: this.title,

      isbn: this.isbn,

      publicationYear: this.publicationYear,

      authorId: this.authorId,

      categoryId: this.categoryId


    };

    this.bookService.updateBook(
      this.id,
      book
    )
    .subscribe({

      next: () => {

        console.log(
          "Livre modifié"
        );

        this.router.navigate(['/books']);

      },

      error: (error) => {

        console.error(
          "Erreur modification livre",
          error
        );

      }

    });

  }

}