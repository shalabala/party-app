import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyPageComponent } from './hierarchy-page.component';

describe('HierarchyPageComponent', () => {
  let component: HierarchyPageComponent;
  let fixture: ComponentFixture<HierarchyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
