import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../models/author';
import { AuthorRequest } from '../models/AuthorRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/authors';

  getAuthors() {

    return this.http.get<Author[]>(
      this.apiUrl
    );

  }

  getAuthorById(id: number) {

    return this.http.get<Author>(
      `${this.apiUrl}/${id}`
    );

  }

 addAuthor(author: AuthorRequest) {

  return this.http.post<Author>(
    this.apiUrl,
    author
  );

}

  updateAuthor(id: number, author: AuthorRequest) {

    return this.http.put<Author>(
      `${this.apiUrl}/${id}`,
      author
    );

  }

  deleteAuthor(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

}