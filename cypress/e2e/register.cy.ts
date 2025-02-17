/// <reference types="cypress" />

describe('Register spec', () => {
  it('Register successful', () => {
    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 201,
      body: {
        email: 'test@test.com',
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'test!1234'
      },
    }).as('register')

    cy.get('input[formControlName=email]').type("test@test.com")
    cy.get('input[formControlName=firstName]').type("firstName")
    cy.get('input[formControlName=lastName]').type("lastName")
    cy.get('input[formControlName=password]').type("test!1234")

    cy.get('.register-form > .mat-focus-indicator').click()
    cy.wait('@register')
    cy.url().should('include', '/login')
  })

  it('Register with missing fields', () => {
    cy.visit('/register')
    cy.get('.register-form > .mat-focus-indicator').should('be.disabled')
  })
  it('Register with existing email', () => {
    cy.visit('/register')
    cy.get('input[formControlName=firstName]').type("firstName")
    cy.get('input[formControlName=lastName]').type("lastName")
    cy.get('input[formControlName=email]').type("existing@studio.com")
    cy.get('input[formControlName=password]').type("test!1234")
    cy.get('button[type=submit]').click()
    cy.get('.error').contains('An error occurred').should('be.visible')
  })
  it('should display error on invalid form submission', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
  });
});