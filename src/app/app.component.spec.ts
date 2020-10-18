import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatToolbarModule, MatButtonModule, MatIconModule, HttpClientModule],
      declarations: [AppComponent],
      providers: [MatToolbarModule, MatButtonModule, MatIconModule, HttpClientModule, OVERLAY_PROVIDERS],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it(`should have as title 'table-reserve'`, () => {
    expect(app.title).toEqual('table-reserve');
  });

  it(`should setCircleInitial return the user name first letter in upper case`, () => {
    localStorage.setItem('name', 'asdasd');
    expect(component.setCircleInitial()).toEqual('A');

    localStorage.setItem('name', 'qweqwe');
    expect(component.setCircleInitial()).toEqual('Q');
  });
});
