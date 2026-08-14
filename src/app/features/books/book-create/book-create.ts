import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../services/book';
import { AuthorService } from '../../../services/author';
import { CategoryService } from '../../../services/category';
import { Author } from '../../../models/author';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-book-create',
  imports: [
    FormsModule
  ],
  templateUrl: './book-create.html',
  styleUrl: './book-create.css'
})
export class BookCreate implements OnInit {

  private bookService = inject(BookService);

  private authorService = inject(AuthorService);

  private categoryService = inject(CategoryService);

  title = '';

  isbn = '';

  publicationYear = 2024;

  authorId = 0;

  categoryId = 0;

  authors: Author[] = [];

  categories: Category[] = [];

  ngOnInit(): void {

    this.authorService.getAuthors()
      .subscribe({

        next: (data) => {

          this.authors = data;

          console.log(
            "Auteurs reçus",
            data
          );

        },

        error: (error) => {

          console.error(error);

        }

      });

    this.categoryService.getCategories()
      .subscribe({

        next: (data) => {

          this.categories = data;

          console.log(
            "Catégories reçues",
            data
          );

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  ajouterLivre() {


    const book = {


      title: this.title,

      isbn: this.isbn,

      publicationYear: this.publicationYear,

      authorId: this.authorId,

      categoryId: this.categoryId

    };

    console.log(
      "Données envoyées :",
      book
    );

    this.bookService.addBook(book)
      .subscribe({

        next: (response) => {

          console.log(
            "Livre ajouté",
            response
          );

        },

        error: (error) => {

          console.error(
            "Erreur ajout livre",
            error
          );

        }

      });

  }

}