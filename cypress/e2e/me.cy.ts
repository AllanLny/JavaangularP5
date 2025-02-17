/// <reference types="cypress" />

describe('Me spec', () => {
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

    cy.intercept('GET', '/api/user/1', {
      statusCode: 200,
      body: {
        id: 1,
        email: 'test@test.com',
        firstName: 'firstName',
        lastName: 'lastName',
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
        admin: true
      }
    }).as('getUser')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.wait('@login')
    cy.url().should('include', '/sessions')
  })

  it('Info user', () => {
    cy.get('[routerlink="me"]').click()
    cy.url().should('include', '/me')
    cy.wait('@getUser')
    cy.get('.mat-card-content > div.ng-star-inserted > :nth-child(1)').contains('firstName LASTNAME')
    cy.get('.mat-card-content > div.ng-star-inserted > :nth-child(2)').contains('test@test.com')
    cy.get('.my2').should('contain', 'You are admin')
    cy.get('.p2 > :nth-child(1)').contains('Create at: January 1, 2025')
    cy.get('.p2 > :nth-child(2)').contains('Last update: January 1, 2025')
  })

  it('Navigate to user info and back to sessions', () => {
    cy.get('[routerlink="me"]').click()
    cy.url().should('include', '/me')
    cy.get('button[mat-icon-button]').click()
    cy.url().should('include', '/sessions')
  })
  it('Delete user account', () => {
    // Intercepte la requête pour récupérer l’utilisateur et pour le supprimer
    cy.intercept('GET', '/api/user/1', {
      statusCode: 200,
      body: {
        id: 1,
        email: 'test@user.com',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: false
      }
    }).as('getUser')

    cy.intercept('DELETE', '/api/user/1', {
      statusCode: 200,
      body: {}
    }).as('deleteUser')

    // Ouvre la page "Me"
    cy.get('[routerlink="me"]').click()
    cy.wait('@getUser')
    // Lance la suppression
    cy.get('button[mat-raised-button][color="warn"]').click()
    cy.wait('@deleteUser')

    // Vérifie la redirection et le message confirmé
    cy.url().should('include', '/')
    cy.get('.mat-snack-bar-container').contains('Your account has been deleted !').should('be.visible')
  })
});