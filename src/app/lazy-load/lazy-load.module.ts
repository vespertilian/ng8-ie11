import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';

const lazyLoaded: Routes = [
  {
    path: '',
    component: OneComponent
  },
  {
    path: 'two',
    component: TwoComponent
  }
];


@NgModule({
  declarations: [OneComponent, TwoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(lazyLoaded)
  ]
})
export class LazyLoadModule { }
