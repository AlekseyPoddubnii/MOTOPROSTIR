import { Component, OnInit } from '@angular/core';
import { HomePageService } from './home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [HomePageService]
})
export class HomePageComponent implements OnInit {

  events = [];

  constructor(private homePageService: HomePageService) { }

  ngOnInit() {
    this.homePageService
      .getEvents()
      .subscribe((response) => {
        console.log(response);

      });
  }

}
