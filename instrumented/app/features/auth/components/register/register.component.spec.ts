import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,  
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ]
    }).compileComponents();
    mockAuthService.register.mockReturnValue(of());

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with email, password, firstName, and lastName fields', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
    expect(component.form.contains('firstName')).toBeTruthy();
    expect(component.form.contains('lastName')).toBeTruthy();
  });

  it('should display error when required fields are missing', () => {
    component.form.setValue({ email: '', password: '', firstName: '', lastName: '' });
    component.submit();
    fixture.detectChanges();
    expect(component.form.invalid).toBeTruthy();
    expect(component.onError).toBeFalsy();
  });

  it('should call authService.register when form is valid', () => {
    const registerSpy = jest.spyOn(authService, 'register').mockReturnValue(of());
    component.form.setValue({
      email: 'john@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe'
    });
    component.submit();
    expect(registerSpy).toHaveBeenCalled();
  });

  it('should set onError to true when register fails', () => {
    jest.spyOn(authService, 'register').mockReturnValue(throwError(() => new Error('Register failed')));
    component.form.setValue({
      email: 'john@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe'
    });
    component.submit();
    expect(component.onError).toBeTruthy();
  });
});