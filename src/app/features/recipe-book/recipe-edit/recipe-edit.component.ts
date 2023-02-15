import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  public index: number;
  private editMode = false;

  constructor(private route: ActivatedRoute) {};

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params
      .subscribe((params: Params) => {
        this.index = +params['id'];
        this.editMode = params['id'] !== undefined;
    })
  }
}
