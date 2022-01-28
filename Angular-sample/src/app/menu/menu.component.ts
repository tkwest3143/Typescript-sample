import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  viewMenu:boolean=false;

  constructor() { }

  ngOnInit(): void {
    this.viewMenu=false;
  }

  isViewMenu(){
    this.viewMenu=!this.viewMenu;
    return this.viewMenu;
  }

}
