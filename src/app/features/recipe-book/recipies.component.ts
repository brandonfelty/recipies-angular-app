import { Component } from '@angular/core';
import { RecipiesService } from './recipies.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css'],
  providers: [RecipiesService]
})
export class RecipiesComponent {

}
