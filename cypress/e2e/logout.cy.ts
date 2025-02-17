/// <reference types="cypress" />

describe('Logout spec', () => {
  beforeEach(() => {
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
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.wait('@login')
    cy.url().should('include', '/sessions')
  })

  it('Logout', () => {
    cy.get('span.link').contains('Logout').click();
    cy.url().should('include', '/');
    cy.visit('/sessions');
    cy.url().should('include', '/login');
  })
  
});