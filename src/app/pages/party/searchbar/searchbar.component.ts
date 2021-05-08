import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-party-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchTerm=new EventEmitter<string[]>()
  searchForm=new FormGroup({
    nameField: new FormControl(''),
    titleField:new FormControl('')
  })
  constructor() { }

  ngOnInit(): void {
  }
  search(){
    this.searchTerm.emit([this.searchForm.value.nameField,this.searchForm.value.titleField])
  }

}
