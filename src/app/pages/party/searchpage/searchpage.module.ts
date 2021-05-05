import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './searchpage.component';
import { SearchBarModule } from '../searchbar/searchbar.module';
import { ListModule } from '../list/list.module';



@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    CommonModule, SearchBarModule, ListModule
  ],
  exports:[SearchPageComponent]
})
export class SearchPageModule { }
