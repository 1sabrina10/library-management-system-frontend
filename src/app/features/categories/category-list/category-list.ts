import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category';
import { Category } from '../../../models/category';
import { TokenService } from '../../../services/token';

@Component({
  selector: 'app-category-list',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList implements OnInit {

  private categoryService = inject(CategoryService);

  private tokenService = inject(TokenService);

  private cdr = inject(ChangeDetectorRef);

  categories: Category[] = [];

  ngOnInit(): void {

    this.categoryService.getCategories()
      .subscribe({

        next: (data: Category[]) => {

          this.categories = data;

          console.log(
            'Catégories reçues',
            data
          );

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Erreur récupération catégories',
            error
          );

        }

      });

  }

  isAdmin(): boolean {

    return this.tokenService.isAdmin();
  }

  supprimerCategorie(id: number): void {

    if (!confirm('Supprimer cette catégorie ?')) {

      return;

    }

    this.categoryService.deleteCategory(id)
      .subscribe({

        next: () => {

          console.log('Catégorie supprimée');

          this.categories = this.categories.filter(
            category => category.id !== id
          );

        },

        error: (error) => {

          console.error(
            'Erreur suppression catégorie',
            error
          );

        }

      });

  }

}