import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loan } from '../models/loan';
import { LoanRequest } from '../models/LoanRequest';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/loans';

  getLoans() {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  getLoanById(id: number) {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`);
  }

  addLoan(loan: LoanRequest) {
    return this.http.post<Loan>(this.apiUrl, loan);
  }

  returnLoan(id: number) {
    return this.http.put<Loan>(`${this.apiUrl}/${id}/return`, {});
  }

  deleteLoan(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}