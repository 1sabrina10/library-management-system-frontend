import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  successMessage = '';

  ngOnInit(): void {

    const message = sessionStorage.getItem('successMessage');

    if (message) {

      this.successMessage = message;

      sessionStorage.removeItem('successMessage');

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);

    }

  }

}

