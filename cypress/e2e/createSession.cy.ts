/// <reference types="cypress" />

describe('Create Session spec', () => {
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

  it('Create new session', () => {
    cy.intercept('GET', '/api/teacher', {
      statusCode: 200,
      body: [
        {
          id: 1,
          lastName: 'Doe',
          firstName: 'John',
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      ]
    }).as('getTeachers')

    cy.get('.mat-card-header > .mat-focus-indicator').click()
    cy.url().should('include', '/sessions/create')

    cy.get('input[formControlName=name]').type('New Session')
    cy.get('input[formControlName=date]').type('2025-01-01')
    cy.get('textarea[formControlName=description]').type('Description 1')

    cy.get('mat-select[formControlName=teacher_id]').click()
    cy.wait('@getTeachers')
    cy.get('mat-option').contains('John Doe').click()

    cy.intercept('POST', '/api/session', {
      statusCode: 201,
      body: {
        id: 1,
        name: 'New Session',
        date: '2023-12-31',
        teacher_id: 1,
        description: 'This is a session description.'
      }
    }).as('createSession')

    cy.get('button[type=submit]').click()
    cy.wait('@createSession')
    cy.url().should('include', '/sessions')
    cy.get('.mat-snack-bar-container').contains('Session created !').should('be.visible')
  })

  it('Create session with missing fields', () => {
    cy.get('.mat-card-header > .mat-focus-indicator').click()
    cy.url().should('include', '/sessions/create')
    cy.get('button[type=submit]').should('be.disabled')
  })
})