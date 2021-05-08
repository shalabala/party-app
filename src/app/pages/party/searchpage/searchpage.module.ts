import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './searchpage.component';
import { SearchBarModule } from '../searchbar/searchbar.module';
import { ListModule } from '../list/list.module';
import { NewPartyDialogModule } from 'src/app/modal/new-party-dialog/new-party-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    CommonModule, SearchBarModule, ListModule,NewPartyDialogModule,MatDialogModule
  ],
  exports:[SearchPageComponent]
})
export class SearchPageModule { }
