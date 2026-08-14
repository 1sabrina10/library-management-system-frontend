import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../../services/author';
import { Author } from '../../../models/author';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../../services/token';

@Component({
  selector: 'app-author-list',
  imports: [
    CommonModule,
     RouterLink
  ],
  templateUrl: './author-list.html',
  styleUrl: './author-list.css'
})
export class AuthorList implements OnInit {

  private authorService = inject(AuthorService);
  private tokenService = inject(TokenService);
  private cdr = inject(ChangeDetectorRef);

  authors: Author[] = [];

  ngOnInit(): void {

    this.authorService.getAuthors()
      .subscribe({

        next: (data: Author[]) => {

          console.log("Avant affectation", data);

          this.authors = [...data];

          console.log("Après affectation", this.authors);

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

        }

      });


  }

  supprimerAuteur(id: number) {

  if (!confirm("Supprimer cet auteur ?")) {

    return;

  }

  this.authorService.deleteAuthor(id)
    .subscribe({

      next: () => {

        console.log("Auteur supprimé");

        this.authors = this.authors.filter(
          author => author.id !== id
        );

      },

      error: (error) => {

        console.error(
          "Erreur suppression auteur",
          error
        );

      }

    });

}

isAdmin(): boolean {

  return this.tokenService.isAdmin();

}

}