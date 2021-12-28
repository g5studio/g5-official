import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleUploadButtonComponent } from './multiple-upload-button.component';

describe('MultipleUploadButtonComponent', () => {
  let component: MultipleUploadButtonComponent;
  let fixture: ComponentFixture<MultipleUploadButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleUploadButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleUploadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
