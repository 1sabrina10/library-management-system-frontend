import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable } from 'rxjs';
import { BookRequest } from '../models/book-request';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/books';

  getBooks(): Observable<Book[]> {

    return this.http.get<Book[]>(this.apiUrl);

  }

  addBook(book: BookRequest) {
  return this.http.post(
    `${this.apiUrl}`,
    book
  );
}

getBookById(id: number) {

  return this.http.get<Book>(
    `${this.apiUrl}/${id}`
  );

}

updateBook(id: number, book: BookRequest) {

  return this.http.put(
    `${this.apiUrl}/${id}`,
    book
  );

}

deleteBook(id: number) {

  return this.http.delete(
    `${this.apiUrl}/${id}`
  );

}
}

