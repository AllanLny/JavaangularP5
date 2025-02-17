/// <reference types="cypress" />

describe('Session Detail spec', () => {
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

    cy.intercept('GET', '/api/session', {
      statusCode: 200,
      body: [
        {
          id: 1,
          name: 'New Session',
          date: '2025-01-01',
          teacher_id: 1,
          description: 'Description 1',
          users: []
        }
      ]
    }).as('session')

    cy.intercept('GET', '/api/session/1', {
      statusCode: 200,
      body: {
        id: 1,
        name: 'New Session',
        date: '2024-12-31',
        teacher_id: 1,
        description: 'This is a session description.',
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
        users: []
      }
    }).as('getSessionDetail')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.wait('@login')
    cy.wait('@session')
    cy.url().should('include', '/sessions')
  })

  it('View session details', () => {
    cy.get('.mat-card-actions > :nth-child(1)').click()
    cy.url().should('include', '/sessions/detail/1')
    cy.wait('@getSessionDetail')
    cy.get('[fxlayoutalign="space-between center"] > :nth-child(2) > .mat-focus-indicator').should('be.visible')
    cy.get('[fxlayoutalign="space-between center"] > :nth-child(2) > .mat-focus-indicator').click()
    cy.url().should('include', '/sessions')
  })

  it('View session details and navigate back', () => {
    cy.get('.mat-card-actions > :nth-child(1)').click()
    cy.url().should('include', '/sessions/detail/1')
    cy.wait('@getSessionDetail')
    cy.get('[fxlayoutalign="space-between center"] > :nth-child(1) > .mat-focus-indicator').click()
    cy.url().should('include', '/sessions')
  })

  it('session details delete', () => {
    cy.intercept('DELETE', '/api/session/1', {
      statusCode: 200,
      body: {}
    }).as('deleteSession')

    cy.get('.mat-card-actions > :nth-child(1)').click()
    cy.url().should('include', '/sessions/detail/1')
    cy.wait('@getSessionDetail')
    cy.get(':nth-child(2) > .mat-focus-indicator').should('be.visible')
    cy.get(':nth-child(2) > .mat-focus-indicator').click()
    cy.wait('@deleteSession')
    cy.url().should('include', '/sessions')
    cy.get('.mat-snack-bar-container').contains('Session deleted !').should('be.visible')
  })

  it('Verify session details', () => {
    cy.get('.mat-card-actions > :nth-child(1)').click()
    cy.url().should('include', '/sessions/detail/1')
    cy.wait('@getSessionDetail')
    cy.get('h1').should('contain', 'New Session')
    cy.get('.description').should('contain', 'This is a session description.')
    cy.get('.created').should('contain', 'January 1, 2025')
    cy.get('.updated').should('contain', 'January 1, 2025')
    cy.get('.my2 > :nth-child(2)').should('contain', 'December 31, 2024')
  })
  
  
})