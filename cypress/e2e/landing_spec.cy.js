describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/tricks", {
      statusCode: 200,
      fixture: 'tricks.json'
    }).as('getTricks')

    cy.intercept("POST", "http://localhost:3001/api/v1/tricks", {
      statusCode: 200,
      fixture: 'newTrick.json'
    }).as('postTrick')
    
    cy.visit('http://localhost:3000')


  })
  
  it('should display tricks and a form when the page loads', () => {
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

  it('should reflect values input into form', () => {
    cy.wait('@getTricks').then((interception) => {
      cy.get('select').first().select('regular')
        .get('select').first().should('have.value', 'regular')
        .get('input[type="text"]').first().type('new trick')
        .get('input[type="text"]').first().should('have.value', 'new trick')
        .get('select').last().select('stairs')
        .get('select').last().should('have.value', 'stairs')
        .get('input[type="text"]').last().type('www.example.com')
        .get('input[type="text"]').last().should('have.value', 'www.example.com')
      })
  })

  it('should display a new trick after adding it via the form', () => {
    cy.wait('@getTricks').then((interception) => {
      cy.get('select').first().select('regular')
        .get('input[type="text"]').first().type('new trick')
        .get('select').last().select('stairs')
        .get('input[type="text"]').last().type('www.example.com')
        .get('button').contains('Send it!').click()
        .get('.tricks-box').children().should('have.length', 4)
        .get('.single-trick').last().contains('p', 'regular new trick')
        .get('.single-trick').last().contains('p', 'Obstacle: stairs')
        .get('.single-trick').last().contains('p', 'Link to tutorial:')
        .get('.single-trick').last().contains('a', 'www.example.com')
      })
  })
})