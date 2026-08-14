import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category';

@Component({
selector: 'app-category-create',
imports: [
FormsModule,
RouterLink
],
templateUrl: './category-create.html',
styleUrl: './category-create.css'
})
export class CategoryCreate {

private categoryService = inject(CategoryService);
private router = inject(Router);

name = '';

ajouterCategorie(): void {

const category = {
  name: this.name
};

this.categoryService.addCategory(category)
  .subscribe({

    next: (response) => {

      console.log(
        'Catégorie ajoutée',
        response
      );

      this.router.navigate(['/categories']);

    },

    error: (error) => {

      console.error(
        'Erreur ajout catégorie',
        error
      );

    }

  });


}

}
