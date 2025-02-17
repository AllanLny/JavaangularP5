/// <reference types="cypress" />

describe('Update Session spec', () => {
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

    cy.intercept('GET', '/api/session', {
      statusCode: 200,
      body: [
        {
          id: 1,
          name: 'New Session',
          date: '2025-01-01',
          teacher_id: 1,
          description: 'Description 1'
        }
      ]
    }).as('session')

    cy.intercept('GET', '/api/session/1', {
      statusCode: 200,
      body: {
        id: 1,
        name: 'New Session',
        date: '2023-12-31',
        teacher_id: 1,
        description: 'This is a session description.'
      }
    }).as('getSessionDetail')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.wait('@login')
    cy.wait('@session')
    cy.url().should('include', '/sessions')
  })

  it('Update session', () => {
    cy.get('.mat-card-actions > .ng-star-inserted').click()
    cy.url().should('include', 'sessions/update/1')
    cy.wait('@getSessionDetail')
    cy.get('input[formControlName=name]').should('have.value', 'New Session')
    cy.get('input[formControlName=date]').should('have.value', '2023-12-31')
    cy.get('textarea[formControlName=description]').should('have.value', 'This is a session description.')
    cy.get('mat-select[formControlName=teacher_id]').click()
    cy.wait('@getTeachers')
    cy.get('mat-option').contains('John Doe').click()
    cy.get('input[formControlName=name]').type("New Session2")
    cy.get('input[formControlName=date]').type('2025-01-01')
    cy.get('textarea[formControlName=description]').type('New Description')
    cy.get('.mt2 > [fxlayout="row"] > .mat-focus-indicator').click()

    cy.intercept('PUT', '/api/session/1', {
      statusCode: 200,
      body: {
        id: 1,
        name: 'New Session2',
        date: '2025-01-01',
        teacher_id: 1,
        description: 'New Description'
      }
    }).as('updateSession')

    cy.get('button[type=submit]').click()
    cy.wait('@updateSession')
    cy.url().should('include', '/sessions')
    cy.get('.mat-snack-bar-container').contains('Session updated !').should('be.visible')
  })

  it('Update session with missing fields', () => {
    cy.get('.mat-card-actions > .ng-star-inserted').click()
    cy.url().should('include', 'sessions/update/1')
    cy.wait('@getSessionDetail')
    cy.get('input[formControlName=name]').clear()
    cy.get('.mt2 > [fxlayout="row"] > .mat-focus-indicator').should('be.disabled')
  })
})