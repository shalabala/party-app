import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,MatToolbarModule,
    RouterModule, MatIconModule,
    MatMenuModule, MatToolbarModule, 
    MatButtonModule
  ],
  exports: [NavComponent]
})
export class NavModule { }
