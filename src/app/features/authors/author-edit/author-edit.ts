import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';
import { AuthorService } from '../../../services/author';
import { AuthorRequest } from '../../../models/AuthorRequest';

@Component({
  selector: 'app-author-edit',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './author-edit.html',
  styleUrl: './author-edit.css'
})
export class AuthorEdit implements OnInit {


  private authorService = inject(AuthorService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  id!: number;

  firstname = '';

  lastname = '';

  biography = '';



  ngOnInit(): void {


    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );



    this.authorService.getAuthorById(this.id)
      .subscribe(author => {


        this.firstname = author.firstname ?? '';

        this.lastname = author.lastname ?? '';

        this.biography = author.biography ?? '';


      });

  }

  modifierAuteur() {

    const author: AuthorRequest = {

      firstname: this.firstname,

      lastname: this.lastname,

      biography: this.biography

    };

    this.authorService.updateAuthor(this.id, author)
      .subscribe({

        next: () => {

          console.log("Auteur modifié");

          this.router.navigate(['/authors']);


        },

        error: (error) => {

          console.error(
            "Erreur modification auteur",
            error
          );


        }


      });
  }

}