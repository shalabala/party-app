import { Component, Input, OnInit } from '@angular/core';
import { Party } from 'src/app/shared/model/party.model';

@Component({
  selector: 'app-party-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() parties: Party[]
  @Input() detailsCallback: (Party)=>void
  @Input() deleteCallback: (Party)=>void
  constructor() { }

  ngOnInit(): void {
  }

}
