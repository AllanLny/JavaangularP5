/// <reference types="cypress" />

describe('Page not found spec', () => {
    it('Should display Page not found!', () => {
      // Simule la navigation vers une URL inexistante
      cy.visit('/404')
      // Vérifie que le message "Page not found !" est affiché
      cy.get('h1').contains('Page not found !').should('be.visible')
    })
  });