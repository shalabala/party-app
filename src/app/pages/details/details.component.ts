import { Component, OnInit } from '@angular/core';
import { testParties } from 'src/app/shared/constants';
import { Party } from 'src/app/shared/model/party.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  party?: Party=testParties[0]

  constructor() { }

  ngOnInit(): void {
  }

}
