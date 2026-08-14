export interface Loan {
  id: number;

  userName: string;

  bookTitle: string;

  BorrowDate: string;

  returnDate: string | null;
  
  loanStatus: string;
}