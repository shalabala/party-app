import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NewPartyDialogComponent } from 'src/app/modal/new-party-dialog/new-party-dialog.component';
import { PartyService } from 'src/app/services/party.service';
import { Party } from 'src/app/shared/model/party.model';

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
    this.subscriptions.push(this.route.paramMap
      .pipe(switchMap(params =>
        this.partyService.getById(params.get('id'))
      )).subscribe(value=>this.party=value))
  }

  ngOnDestroy(){
    this.subscriptions.forEach(s=>s.unsubscribe)
  }

  editParty(){
    let dRef = this.matDialog.open(NewPartyDialogComponent, {
      height: "50%",
      width: "50%",
      data:{
        party:this.party
      }
    });
    dRef.afterClosed().subscribe(result => {
      this.partyService.update(result)
    })
  }

}
