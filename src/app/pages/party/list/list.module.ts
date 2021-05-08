import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { CardModule } from '../card/card.module';
import {  MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,CardModule, MatButtonModule
  ],
  exports: [ListComponent]
})
export class ListModule { }
