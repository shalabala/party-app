import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './searchbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule, MatToolbarModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule
  ],
  exports: [SearchBarComponent]
})
export class SearchBarModule { }
