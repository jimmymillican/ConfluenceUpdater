import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TenantStateService } from './services/tenantState.Service'; // Update this path
import { ApiService } from './services/api.service'; // Update this path
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        TenantStateService,
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ehsq-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ehsq-frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(' ()');
  });
});
