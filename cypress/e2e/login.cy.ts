/// <reference types="cypress" />

describe('Login spec', () => {
  it('Login successful', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    }).as('login')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type("test!1234{enter}{enter}")

    cy.wait('@login')
    cy.url().should('include', '/sessions')
  })

  it('Login with empty email', () => {
    cy.visit('/login')

    cy.get('input[formControlName=password]').type("test!1234{enter}{enter}")
    cy.get('.error').should('contain', 'An error occurred')
  })

  it('Login with empty password', () => {
    cy.visit('/login')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type('{enter}{enter}')
    cy.get('.error').should('contain', 'An error occurred')
  })

  it('Login with invalid email format', () => {
    cy.visit('/login')

    cy.get('input[formControlName=email]').type("invalid-email")
    cy.get('input[formControlName=password]').type("test!1234{enter}{enter}")
    cy.get('.error').should('contain', 'An error occurred')
  })

  it('Login with incorrect password', () => {
    cy.visit('/login')
    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type("wrongpassword{enter}{enter}")
    cy.get('.error').should('contain', 'An error occurred')
  })

  it('Login with incorrect email', () => {
    cy.visit('/login')
    cy.get('input[formControlName=email]').type("wrong@studio.com")
    cy.get('input[formControlName=password]').type("test!1234{enter}{enter}")
    cy.get('.error').should('contain', 'An error occurred')
  })

  it('Should log in and set sessionInformation', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'sessionUser',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: false
      }
    }).as('loginCall');

    cy.get('input[formControlName="email"]').type("session@service.com");
    cy.get('input[formControlName="password"]').type("sessionPass{enter}{enter}");

    cy.wait('@loginCall');
    cy.url().should('include', '/sessions');
  });

  it('should display error on login failure', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: { message: 'Login failed' }
    }).as('loginFailure')

    cy.get('input[formControlName=email]').type("test@test.com")
    cy.get('input[formControlName=password]').type("wrongpassword{enter}{enter}")

    cy.wait('@loginFailure')
    cy.get('.error').should('be.visible')
  })
})