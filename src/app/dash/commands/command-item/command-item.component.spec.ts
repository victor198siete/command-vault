import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandItemComponent } from './command-item.component';

describe('CommandItemComponent', () => {
  let component: CommandItemComponent;
  let fixture: ComponentFixture<CommandItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
