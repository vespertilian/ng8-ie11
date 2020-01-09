import { InjectionToken } from '@angular/core';
import { InactivityCountdownTimer } from 'inactivity-countdown-timer';

export const inactivityProviderFactory = () => new InactivityCountdownTimer();
export const INACTIVITY_COUNTDOWN_TIMER = new InjectionToken<InactivityCountdownTimer>('InactivityCountdownTimer');
export const INACTIVITY_PROVIDER = { provide: INACTIVITY_COUNTDOWN_TIMER, useFactory: inactivityProviderFactory};
