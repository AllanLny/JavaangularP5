describe('Login spec', () => {
  it('Login successfull and navigation', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/sessions')

 
    cy.intercept('GET', '/api/session', {
      body: [
        {
          name: 'Session 1',
          date: '2023-01-01',
          teacher_id: 1,
          description: 'Description 1'
        }
      ]
    }).as('getSession')

    cy.get('.mat-card-header > .mat-focus-indicator').click()
    cy.url().should('include', '/sessions/create')

    cy.get('input[formControlName=name]').type('New Session')
    cy.get('input[formControlName=date]').type('2023-12-31')
    cy.get('textarea[formControlName=description]').type('This is a new session description.')
    

    cy.get('mat-select[formControlName=teacher_id]').click()
    cy.get('mat-option .mat-option-text').select('mat-select-value-1').click()


    cy.intercept('POST', '/api/session', {
      statusCode: 201,
      body: {
        id: 1,
        name: 'New Session',
        date: '2023-12-31',
        teacher_id: 1,
        description: 'This is a new session description.'
      }
    }).as('createSession')


    cy.get('button[type=submit]').click()


    cy.wait('@createSession')


    cy.url().should('include', '/sessions')

    cy.contains('New Session').should('be.visible')


    cy.get('span.link[routerLink="sessions"]').click()
    cy.url().should('include', '/sessions')


    cy.get('span.link[routerLink="me"]').click()
    cy.url().should('include', '/me')

    cy.get('span.link').contains('Logout').click()
    cy.url().should('include', '/')
  })
});