import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from '../../../services/author';
import { AuthorRequest } from '../../../models/AuthorRequest';

@Component({
  selector: 'app-author-create',
  imports: [
    FormsModule
  ],
  templateUrl: './author-create.html',
  styleUrl: './author-create.css'
})
export class AuthorCreate {


  private authorService = inject(AuthorService);

  private router = inject(Router);


  firstname = '';

  lastname = '';

  biography = '';


  ajouterAuteur() {

    const author: AuthorRequest = {

      firstname: this.firstname,

      lastname: this.lastname,

      biography: this.biography

    };

    this.authorService.addAuthor(author)
      .subscribe({

        next: (response) => {

          console.log("Auteur ajouté", response);

          this.router.navigate(['/authors']);

        },

        error: (error) => {

          console.error(error);

        }

      });


  }

}