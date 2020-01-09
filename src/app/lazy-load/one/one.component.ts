import { Component, OnInit } from '@angular/core';
import { InactivityLogoutService } from '../inactivity-logout.service';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent implements OnInit {

  constructor(private inactivityLogoutService: InactivityLogoutService) {
  }

  ngOnInit() {
    this.inactivityLogoutService.init();
  }

}
