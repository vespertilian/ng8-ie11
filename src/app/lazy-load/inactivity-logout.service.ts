import { Inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { INACTIVITY_COUNTDOWN_TIMER } from '../inactivity-countdown-provider';
import { Subject } from 'rxjs';
import { SessionInfoService } from './session-info.service';
import { IInactivityConfig, InactivityCountdownTimer } from 'inactivity-countdown-timer';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InactivityLogoutService implements OnDestroy {

  destroy$ = new Subject();
  constructor(
    @Inject(INACTIVITY_COUNTDOWN_TIMER) private inactivityCountdownTimer: InactivityCountdownTimer,
    private sessionInfo: SessionInfoService,
    private ngZone: NgZone
  ) { }

  init() {
    console.log('init inactivity countdown');
    const inactivityConfigBase: IInactivityConfig = {
      startCountDownTimerAt: 1000 * 60, // 60s
      timeoutCallback: this.timeOut.bind(this),
      countDownCallback: this.countDown.bind(this),
      countDownCancelledCallback: this.cancelCountDown.bind(this),
      throttleDuration: 30 * 1000 // 30s
    };

    this.sessionInfo.getSessionInfo$()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(({token, inactivityTimeout}) => {
        if (!token && this.inactivityCountdownTimer.started) {
          // needed for protractor please see README.md for more info
          this.ngZone.runOutsideAngular(() => {
            console.log('stop timer');
            this.inactivityCountdownTimer.stop();
          });
          return;
        }

        if (!inactivityTimeout && this.inactivityCountdownTimer.started) {
          // tslint:disable-next-line:max-line-length
          // needed for protractor please see README.md for more info
          this.ngZone.runOutsideAngular(() => {
            console.log('stop timer');
            this.inactivityCountdownTimer.stop();
          });
          return;
        }

        if (token && inactivityTimeout) {
          const idleTimeoutTime = inactivityTimeout * 1000;
          // tslint:disable-next-line:max-line-length
          const logMessage = `[inactivity-logout-service] starting the inactivity logout timer, with a value from the session token of: ${inactivityTimeout / 60} minutes.`;
          // needed for protractor please see README.md for more info
          this.ngZone.runOutsideAngular(() => {
            console.log('start timer');
            this.inactivityCountdownTimer.setup({...inactivityConfigBase, idleTimeoutTime});
            this.inactivityCountdownTimer.start();
          });
        }
      });
  }

  timeOut() {
    console.log('timed out');
  }

  countDown(secondLeft) {
    const message = `Your session will expire in ${secondLeft} seconds. Please click anywhere to keep working.`;
    console.log(message);
  }

  cancelCountDown() {
    console.log(`We have extended your session.`);
  }

  ngOnDestroy(): void {
    this.inactivityCountdownTimer.cleanup();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
