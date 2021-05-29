import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { searchRoute } from 'src/app/shared/constants';
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

  subscriptions=[]
  ngOnInit(): void {
    this.subscriptions.push(
      this.searchForm.get('nameField').valueChanges.pipe(debounce(_=>interval(200)))
      .subscribe(val=>this.search()),
      this.searchForm.get('titleField').valueChanges.pipe(debounce(_=>interval(200)))
      .subscribe(val=>this.search())
    )
  }
  ngOnDestroy(){
    this.subscriptions.forEach(it=>it.unsubscribe())
  }
  search(){
    this.searchTerm.emit({name:this.searchForm.value.nameField,title:this.searchForm.value.titleField})
  }

}
