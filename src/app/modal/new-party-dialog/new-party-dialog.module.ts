import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPartyDialogComponent } from './new-party-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [NewPartyDialogComponent],
  imports: [
    CommonModule, MatDialogModule, FormsModule, ReactiveFormsModule,  MatButtonModule,
    MatFormFieldModule, MatInputModule, MatRadioModule, MatIconModule
  ],
  exports:[NewPartyDialogComponent]
})
export class NewPartyDialogModule { }
