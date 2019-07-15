import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCasesComponent } from './test-cases.component';
import {Pipe, PipeTransform} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {DataService} from '../../services/data.service';

describe('TestCasesComponent', () => {
  let component: TestCasesComponent;
  let fixture: ComponentFixture<TestCasesComponent>;

  const DataServiceStub = {
    setRouterUrl: (val: string) => {},
    getRouterUrl: () => ''
  };

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
        TestCasesComponent,
        TranslatePipe
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: DataService, useValue: DataServiceStub },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should collapse', () => {
    let colHigh = document.getElementById('redirect-content').style.maxHeight;
    component.collapseThis('redirect');
    expect(document.getElementById('redirect-content').style.maxHeight).not.toBe(colHigh);
    component.collapseThis('redirect');
    expect(document.getElementById('redirect-content').style.maxHeight).toBe(colHigh);

    colHigh = document.getElementById('embedded-content').style.maxHeight;
    component.collapseThis('embedded');
    expect(document.getElementById('embedded-content').style.maxHeight).not.toBe(colHigh);
    component.collapseThis('embedded');
    expect(document.getElementById('embedded-content').style.maxHeight).toBe(colHigh);

    colHigh = document.getElementById('account-content').style.maxHeight;
    component.collapseThis('account');
    expect(document.getElementById('account-content').style.maxHeight).not.toBe(colHigh);
    component.collapseThis('account');
    expect(document.getElementById('account-content').style.maxHeight).toBe(colHigh);
  });
});
