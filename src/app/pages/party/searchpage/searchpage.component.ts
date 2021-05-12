import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewPartyDialogComponent } from 'src/app/modal/new-party-dialog/new-party-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { testParties } from 'src/app/shared/constants';
import { Party } from 'src/app/shared/model/party.model';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchPageComponent implements OnInit {
  parties=testParties
  fullParties=testParties
  lastSearch=[]
  constructor( private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDetails=function(p: Party){
   console.log(p.formattedName,": Details")
  }

  onDelete=function(p: Party){
   console.log(p.formattedName,": Delete")
  }

  onSearch(terms:string[]){
    this.lastSearch=terms
    let matching=[]
    for (const item of this.fullParties) {
      if(item.fullName.toLocaleLowerCase().includes(terms[0].toLocaleLowerCase())
      &&item.title.toLocaleLowerCase().includes(terms[1].toLocaleLowerCase()))
      matching.push(item);
    }
    this.parties=matching
  }
  testDialog(){
    let dRef=this.matDialog.open(NewPartyDialogComponent,{
      height:"50%",
      width:"50%",
    });
    dRef.afterClosed().subscribe(result=>{
      this.fullParties.push(result)
      this.onSearch(this.lastSearch)
    })

  }
}
