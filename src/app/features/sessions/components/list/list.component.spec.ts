import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { ListComponent } from './list.component';
import { expect } from '@jest/globals';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  const mockSessionService = {
    getSessions: jest.fn().mockReturnValue(of([
      { id: 1, name: 'Session 1', date: '2023-01-01', description: 'Description 1' },
      { id: 2, name: 'Session 2', date: '2023-02-01', description: 'Description 2' }
    ])),
    sessionInformation: {
      admin: true
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientModule, MatCardModule, MatIconModule],
      providers: [{ provide: SessionService, useValue: mockSessionService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of sessions', waitForAsync(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const sessionElements = compiled.querySelectorAll('.items .item');
      expect(sessionElements.length).toBe(2);
    });
  }));

  it('should display "Create" button if user is admin', () => {
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement as HTMLElement;
    const createButton = compiled.querySelector('button[routerLink="create"]');
  
    expect(createButton).toBeTruthy();
    expect(createButton?.textContent).toContain('Create');
  });

  it('should display "Edit" button if user is admin', waitForAsync(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const editButton = compiled.querySelector('button[routerLink^="update"]');
    
      expect(editButton).toBeTruthy();
      expect(editButton?.textContent).toContain('Edit');
    });
  }));
  });