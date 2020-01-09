import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionInfoService implements OnDestroy {

  sessionInfo$ = new ReplaySubject(1);
  destroy$ = new Subject();
  constructor() {
    this.sessionInfo$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        console.log('session-info', v);
      });
  }

  getSessionInfo$() {
    return this.sessionInfo$.asObservable();
  }

  set10sec() {
    this.sessionInfo$.next({
      token: 'foo',
      inactivityTimeout: 10
    });
  }

  setTwoMins() {
    this.sessionInfo$.next({
      token: 'foo',
      inactivityTimeout: 60 * 2
    });
  }

  setThreeMins() {
    this.sessionInfo$.next({
      token: 'foo',
      inactivityTimeout: 60 * 3
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
