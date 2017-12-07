import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  menuSelected: String = "home";
  ngOnInit() {
    this.router.navigate([this.menuSelected]);
  }

  goto(name: String) {
    this.menuSelected = name;
    this.router.navigate([name]);
  }

}
