import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchPattern } from '../searchpage/searchpage.component';

@Component({
  selector: 'app-party-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchTerm=new EventEmitter<SearchPattern>()
  searchForm=new FormGroup({
    nameField: new FormControl(''),
    titleField:new FormControl('')
  })
  constructor() { }

  ngOnInit(): void {
  }
  search(){
    this.searchTerm.emit({title:this.searchForm.value.nameField,name:this.searchForm.value.titleField})
  }

}
