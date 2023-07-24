describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/tricks", {
      statusCode: 200,
      fixture: 'tricks.json'
    }).as('getTricks')
  })
  
  it('should display tricks and a form when the page loads', () => {
    cy.visit('http://localhost:3000')
    cy.wait('@getTricks').then((interception) => {
      cy.get('h1').contains('Sick Trick Wish List')
        .get("form").children().should('have.length', 5)
        .get('.tricks-box').find('.single-trick').should('have.length', 3)
        .get('.single-trick').first().contains('p', 'regular treflip')
        .get('.single-trick').first().contains('p', 'Obstacle: flat ground')
        .get('.single-trick').first().contains('p', 'Link to tutorial:')
        .get('.single-trick').first().contains('a', 'https://www.youtube.com/watch?v=XGw3YkQmNig')
        .get('.single-trick').last().contains('p', 'regular frontside 50-50, backside 180 out')
        .get('.single-trick').last().contains('p', 'Obstacle: ledge')
        .get('.single-trick').last().contains('p', 'Link to tutorial:')
        .get('.single-trick').last().contains('a', 'https://www.youtube.com/watch?v=9N9swrZU1HA')
      })
  })
})