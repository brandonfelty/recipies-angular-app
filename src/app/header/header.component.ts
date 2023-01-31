import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() changePage = new EventEmitter<string>();
  collapsed = true;

  onChangePage(page: string) {
    this.changePage.emit(page);
  }
}
