import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { DetailComponent } from './detail.component';
import { expect } from '@jest/globals';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let service: SessionService;

  const mockSessionService = {
    getSession: jest.fn().mockReturnValue(of({
      id: 1,
      name: 'Session 1',
      date: '2023-01-01',
      description: 'Description 1'
    })),
    sessionInformation: {
      admin: true,
      id: 1
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule
      ],
      declarations: [DetailComponent],
      providers: [{ provide: SessionService, useValue: mockSessionService }]
    }).compileComponents();

    service = TestBed.inject(SessionService);
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display session information correctly', waitForAsync(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const sessionElement = compiled.querySelector('.session-detail');

      expect(sessionElement?.querySelector('mat-card-title')?.textContent).toContain('Session 1');
      expect(sessionElement?.querySelector('mat-card-subtitle')?.textContent).toContain('Session on January 1, 2023');
      expect(sessionElement?.querySelector('mat-card-content')?.textContent).toContain('Description 1');
    });
  }));

  it('should display "Delete" button if user is admin', waitForAsync(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const deleteButton = compiled.querySelector('button[routerLink^="delete"]');

      expect(deleteButton).toBeTruthy();
      expect(deleteButton?.textContent).toContain('Delete');
    });
  }));
});