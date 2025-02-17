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
      cy.intercept('GET', '/api/session', {
        statusCode: 200,
        body: [
        {
            id: 1,
            name: 'New Session',
            date: '2023-12-31',
            teacher_id: 1,
            description: 'This is a session description.'
        }
        ]
    }).as('session')
  
      cy.get('input[formControlName=email]').type("yoga@studio.com")
      cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
  
      cy.wait('@login')
      cy.wait('@session')
      cy.url().should('include', '/sessions')

    })
    it('Show Session', () => {
        cy.get('.mat-card-subtitle').contains('Session on December 31, 2023')
        cy.get('.picture').should('be.visible')
        cy.get('p').contains('This is a session description.')
        cy.get('.mat-card-actions > :nth-child(1)').should('be.visible')
        cy.get('.mat-card-actions > .ng-star-inserted').should('be.visible')
        })
    })
