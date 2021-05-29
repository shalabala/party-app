import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPartyDialogComponent } from 'src/app/modal/new-party-dialog/new-party-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { PartyService } from 'src/app/services/party.service';
import { Party } from 'src/app/shared/model/party.model';
import { flatMap, last, map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { coworkerDetailsRoute } from 'src/app/shared/constants';
import { Meta } from '@angular/platform-browser';

export interface SearchPattern {
  name: string,
  title: string
}
@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchPageComponent implements OnInit {
  parties: ReplaySubject<Party[]>
  lastSearch: ReplaySubject<SearchPattern>
  subscriptions = []

  onDetails
  onDelete

  constructor(private matDialog: MatDialog, private partyService: PartyService, private authService: AuthService,
    private router: Router, private meta :Meta) {
      meta.addTag({name:"viewport", content:"width=device-width, initial-scale=1" })
      this.onDetails=function(p:Party) {
        router.navigate(['/'+coworkerDetailsRoute,{id:p.id}])
      }
      this.onDelete=function(p: Party) {
        partyService.delete(p).catch(err=>console.log('deletion failed', err))
      }

  }

  ngOnInit(): void {
    this.lastSearch = new ReplaySubject()
    let companyPartyObservable =this.authService.userObservable.pipe(
      flatMap(it=> this.partyService.getAllForCompany(this.authService.user.userId)))
    this.parties = new ReplaySubject()
    this.subscriptions.push(combineLatest([companyPartyObservable, this.lastSearch])
      .pipe(map(array =>
        array[0].filter(
          element => element.fullName.toLocaleLowerCase().includes(array[1].name.toLocaleLowerCase()) &&
            element.title.toLocaleLowerCase().includes(array[1].title.toLocaleLowerCase()))))
            .subscribe(this.parties))

    this.lastSearch.next({ name: "", title: "" })

  }
  ngOnDestroy(){
    this.subscriptions.forEach(s=>s.unsubscribe())
  }

  

  onSearch(terms: SearchPattern) {
    this.lastSearch.next(terms)
  }
  addParty() {
    let dRef = this.matDialog.open(NewPartyDialogComponent, {
      height: "95%",
      width: "95%",
    });
    dRef.afterClosed().subscribe(result => {
      this.partyService.set(result)
      .then(
        ()=>console.log("Update success")
        )
      .catch(
        it=>console.log("Update failed: ",it)
        )
    })

  }
}
