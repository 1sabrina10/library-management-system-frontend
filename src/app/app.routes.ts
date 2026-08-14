import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { BookList } from './features/books/book-list/book-list';
import { adminGuard } from './core/guards/admin.guard';
import { LoanList } from './features/loans/loan-list/loan-list';
import { Home } from './features/home/home/home';
import { BookDetail } from './features/books/book-detail/book-detail';
import { LoanDetail } from './features/loans/loan-detail/loan-detail';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
  path: '',
  component: Home
},

 {
path: 'books',
canActivate: [authGuard],
component: BookList
},

{
path: 'books/create',
canActivate: [authGuard, adminGuard],
loadComponent: () =>
import('./features/books/book-create/book-create')
.then(m => m.BookCreate)
},

{
path: 'books/:id',
canActivate: [authGuard],
component: BookDetail
},

{
path: 'books/edit/:id',
canActivate: [authGuard, adminGuard],
loadComponent: () =>
import('./features/books/book-edit/book-edit')
.then(m => m.BookEdit)
},

{
  path: 'authors',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/authors/author-list/author-list')
      .then(m => m.AuthorList)
},

{
  path: 'authors/create',
 canActivate: [authGuard, adminGuard],
  loadComponent: () =>
    import('./features/authors/author-create/author-create')
      .then(m => m.AuthorCreate)
},

{
  path: 'authors/edit/:id',
  canActivate: [authGuard, adminGuard],
  loadComponent: () =>
    import('./features/authors/author-edit/author-edit')
      .then(m => m.AuthorEdit)
},

{
  path: 'categories',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/categories/category-list/category-list')
      .then(m => m.CategoryList)
},

{
  path: 'categories/create',
 canActivate: [authGuard, adminGuard],
  loadComponent: () =>
    import('./features/categories/category-create/category-create')
      .then(m => m.CategoryCreate)
},

{
  path: 'categories/edit/:id',
canActivate: [authGuard, adminGuard],
  loadComponent: () =>
    import('./features/categories/category-edit/category-edit')
      .then(m => m.CategoryEdit)
},

{
  path: 'loans',
  canActivate: [authGuard],
  component: LoanList
},

{
  path: 'loans/create',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/loans/loan-create/loan-create')
      .then(m => m.LoanCreate)
},

{
  path: 'loans/:id',
  canActivate: [authGuard],
  component: LoanDetail
}


  





];