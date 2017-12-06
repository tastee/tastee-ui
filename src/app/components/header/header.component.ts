import { Component, OnInit } from '@angular/core';
import { TasteeService } from '../../services/tastee.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [TasteeService]
})
export class HeaderComponent implements OnInit {

  constructor(private tasteeService: TasteeService) { }

  ngOnInit() {
  }

  runTastee() {
    this.tasteeService.runTastee();
  }

}
