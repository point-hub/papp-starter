import { Then, When } from '@badeball/cypress-cucumber-preprocessor'

When('I visit {string}', (homepage: string) => {
  cy.visit(homepage)
})

Then('I should be redirected to {string}', (path: string) => {
  cy.location('pathname').should('have.string', path)
})

Then('I should be able to see {string}', (text: string) => {
  cy.get('div').contains(text)
})
