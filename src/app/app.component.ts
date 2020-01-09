import { Component } from '@angular/core';
import { SessionInfoService } from './lazy-load/session-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng8-ie11';

  constructor(private sessionInfo: SessionInfoService) {
  }

  tenSec() {
    this.sessionInfo.set10sec();
  }

  twoMins() {
    this.sessionInfo.setTwoMins();
  }

  threeMins() {
    this.sessionInfo.setThreeMins();
  }
}
