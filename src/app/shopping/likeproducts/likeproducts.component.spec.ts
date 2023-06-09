import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeproductsComponent } from './likeproducts.component';

describe('LikeproductsComponent', () => {
  let component: LikeproductsComponent;
  let fixture: ComponentFixture<LikeproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeproductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
