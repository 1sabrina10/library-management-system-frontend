import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { CategoryRequest } from '../models/CategoryRequest';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/categories';

  getCategories() {

    return this.http.get<Category[]>(
      this.apiUrl
    );

  }

  getCategoryById(id: number) {

    return this.http.get<Category>(
      `${this.apiUrl}/${id}`
    );

  }

  addCategory(category: CategoryRequest) {

    return this.http.post<Category>(
      this.apiUrl,
      category
    );

  }

  updateCategory(
    id: number,
    category: CategoryRequest
  ) {

    return this.http.put<Category>(
      `${this.apiUrl}/${id}`,
      category
    );

  }

  deleteCategory(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

}