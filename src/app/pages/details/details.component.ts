import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { flatMap, switchMap } from 'rxjs/operators';
import { NewPartyDialogComponent } from 'src/app/modal/new-party-dialog/new-party-dialog.component';
import { PartyService } from 'src/app/services/party.service';
import { Party } from 'src/app/shared/model/party.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private matDialog: MatDialog, private route: ActivatedRoute, private partyService: PartyService) { }

  party:Party
  subscriptions=[]
  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap
      .pipe(flatMap(params =>
        this.partyService.getById(params.get('id'))
      )).subscribe(p=>this.party=p)
      )
  }
  ngOnDestroy(){
    this.subscriptions.forEach(it=>it.unsubscribe())
  }

  editParty(){
    let dRef = this.matDialog.open(NewPartyDialogComponent, {
      height: "95%",
      width: "95%",
      data:{
        party:this.party
      }
    });
    dRef.afterClosed().subscribe(result => {
      this.partyService.set(result).then(
        ()=>console.log("Update success")
        )
      .catch(
        it=>console.log("Update failed: ",it)
        )
    })
  }

}
