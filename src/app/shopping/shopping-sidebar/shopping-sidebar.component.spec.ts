import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingSidebarComponent } from './shopping-sidebar.component';

describe('ShoppingSidebarComponent', () => {
  let component: ShoppingSidebarComponent;
  let fixture: ComponentFixture<ShoppingSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
