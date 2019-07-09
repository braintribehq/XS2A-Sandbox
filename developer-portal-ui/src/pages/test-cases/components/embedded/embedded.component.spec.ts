import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedComponent } from './embedded.component';
import {Pipe, PipeTransform} from "@angular/core";

describe('EmbeddedComponent', () => {
  let component: EmbeddedComponent;
  let fixture: ComponentFixture<EmbeddedComponent>;

  @Pipe({name: 'translate'})
  class TranslatePipe implements PipeTransform {
    transform(value) {
      const tmp = value.split('.');
      return tmp[1];
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmbeddedComponent,
        TranslatePipe
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create (not all)', () => {
    expect(component).toBeTruthy();
  });
});
