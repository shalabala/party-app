import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './searchbar.component';



@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule
  ],
  exports: [SearchBarComponent]
})
export class SearchBarModule { }
