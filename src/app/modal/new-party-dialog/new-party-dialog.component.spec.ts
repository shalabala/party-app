import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPartyDialogComponent } from './new-party-dialog.component';

describe('NewPartyDialogComponent', () => {
  let component: NewPartyDialogComponent;
  let fixture: ComponentFixture<NewPartyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPartyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPartyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
