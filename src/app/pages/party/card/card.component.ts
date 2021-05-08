import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Party } from 'src/app/shared/model/party.model';

@Component({
  selector: 'app-party-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() party :Party
  @Output() details=new EventEmitter<Party>()
  @Output() delete=new EventEmitter<Party>()
  constructor() { }

  ngOnInit(): void {
  }
  onDelete(event: any){
    event.stopPropagation()
    this.delete.emit(this.party)
  }
  onDetails(event: any){
    event.stopPropagation()
    this.details.emit(this.party)
  }
  

}
