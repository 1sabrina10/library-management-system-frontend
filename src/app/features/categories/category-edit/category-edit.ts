import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink  } from '@angular/router';
import { CategoryService } from '../../../services/category';
import { CategoryRequest } from '../../../models/CategoryRequest';

@Component({
  selector: 'app-category-edit',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './category-edit.html',
  styleUrl: './category-edit.css'
})
export class CategoryEdit implements OnInit {

  private categoryService = inject(CategoryService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  id!: number;

  name = '';

  description = '';

  ngOnInit(): void {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );


    this.categoryService.getCategoryById(this.id)
      .subscribe({

        next: (category) => {

          this.name = category.name ?? '';

          this.description = category.description ?? '';

        },

        error: (error) => {

          console.error(
            'Erreur récupération catégorie',
            error
          );

        }

      });

  }

  modifierCategorie(): void {

    const category: CategoryRequest = {

      name: this.name,

      description: this.description

    };

    this.categoryService.updateCategory(
      this.id,
      category
    )
    .subscribe({

      next: () => {

        console.log('Catégorie modifiée');

        this.router.navigate(['/categories']);

      },

      error: (error) => {

        console.error(
          'Erreur modification catégorie',
          error
        );

      }

    });

  }

}