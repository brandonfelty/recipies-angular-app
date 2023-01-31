import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipies-angular-app';
  showRecipies: boolean = true;

  onPageChange(page: string) {

    if (page === 'recipies') {
      this.showRecipies = true;
    } else {
      this.showRecipies = false;
    }
  }
}
