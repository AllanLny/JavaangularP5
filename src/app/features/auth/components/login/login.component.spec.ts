import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { LoginComponent } from './login.component';
import { expect } from '@jest/globals';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      providers: [
        SessionService,
        { provide: AuthService, useValue: mockAuthService },
      ]
    }).compileComponents();

    mockAuthService.login.mockReturnValue(
      of({
        id: 1,
        admin: true,
        token: 'dummyToken',
        type: 'Bearer',
        username: 'jon.doe',
        firstName: 'Jon',
        lastName: 'Doe'
      })
    );

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with email and password fields', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('should display error when required fields are missing', () => {
    component.form.setValue({ email: '', password: '' });
    component.submit();
    fixture.detectChanges(); // ensure view updates
    expect(component.form.invalid).toBeTruthy();
    expect(component.onError).toBeFalsy(); // unchanged
  });

  it('should display error when email is invalid', () => {
    component.form.setValue({ email: 'invalid', password: 'password' });
    component.submit();
    fixture.detectChanges();
    expect(component.form.invalid).toBeTruthy();
    expect(component.onError).toBeFalsy();
  });

  it('should display error when password is invalid', () => {
    component.form.setValue({ email: '', password: 'invalid' });
    component.submit();
    fixture.detectChanges();
    expect(component.form.invalid).toBeTruthy();
    expect(component.onError).toBeFalsy();
  });

  it('should display error when email and password are invalid', () => {
    component.form.setValue({ email: 'invalid', password: 'invalid' });
    component.submit();
    fixture.detectChanges();
    expect(component.form.invalid).toBeTruthy();
    expect(component.onError).toBeFalsy();
  });

  it('should call authService.login when form is valid', () => {
    component.form.setValue({ email: 'test@example.com', password: 'password' });
    component.submit();
    expect(authService.login).toHaveBeenCalled();
  });

  it('should set onError to true when authService.login fails', () => {
    jest.spyOn(authService, 'login').mockReturnValue(
      throwError(() => new Error('Login failed'))
    );
    component.form.setValue({ email: 'test@example.com', password: 'password' });
    component.submit();
    expect(component.onError).toBeTruthy();
  });

  it('should navigate to /sessions on successful login', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    component.form.setValue({ email: 'test@example.com', password: 'password' });
    component.submit();
    expect(navigateSpy).toHaveBeenCalledWith(['/sessions']);
  });
});