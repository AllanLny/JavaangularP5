import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { FormComponent } from './form.component';
import { of } from 'rxjs';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  const mockSessionService = {
    getSession: jest.fn().mockReturnValue(of({
          teacher_id: '1',
          name: 'Session 1',
          date: '2023-01-01',
          description: 'Description 1'
    })),
    create: jest.fn().mockReturnValue(of({})),
    update: jest.fn().mockReturnValue(of({})),
    sessionInformation: {
      admin: true
    }
  } 

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule, 
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: SessionService, useValue: mockSessionService }],
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should create a session', () => {
    mockSessionService.getSession().subscribe((data: { teacher_id: string, name: string, date: string, description: string }) => {
      component.sessionForm?.setValue({
        name: data.name,
        date: data.date,
        teacher_id: data.teacher_id,
        description: data.description
      });

      component.submit();

      expect(mockSessionService.create).toHaveBeenCalledWith({
        name: data.name,
        date: data.date,
        teacher_id: data.teacher_id,
        description: data.description
      });
    });
  });

  it('should show error when required fields are missing', () => {
    component.sessionForm?.setValue({
      name: '',
      date: '',
      teacher_id: '',
      description: ''
    });

    fixture.detectChanges();

    const nameInput = fixture.nativeElement.querySelector('input[formControlName="name"]');
    const dateInput = fixture.nativeElement.querySelector('input[formControlName="date"]');
    const teacherSelect = fixture.nativeElement.querySelector('mat-select[formControlName="teacher_id"]');
    const descriptionTextarea = fixture.nativeElement.querySelector('textarea[formControlName="description"]');

    expect(nameInput.classList).toContain('ng-invalid');
    expect(dateInput.classList).toContain('ng-invalid');
    expect(teacherSelect.classList).toContain('ng-invalid');
    expect(descriptionTextarea.classList).toContain('ng-invalid');
  });

  it('should modify a session', () => {
    mockSessionService.getSession().subscribe((data: { teacher_id: string, name: string, date: string, description: string }) => {
      component.sessionForm?.setValue({
        name: data.name,
        date: data.date,
        teacher_id: data.teacher_id,
        description: data.description
      });

      component.submit();

      expect(mockSessionService.update).toHaveBeenCalledWith({
        name: data.name,
        date: data.date,
        teacher_id: data.teacher_id,
        description: data.description
      });
    });
  });
});