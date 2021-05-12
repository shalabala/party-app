import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatInputModule
  ],
  exports: [DetailsComponent]
})
export class DetailsModule { }
