describe('error handling spec', () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:3001/api/v1/tricks", {
      statusCode: 400,
      fixture: 'newTrick.json'
    }).as('postTrick')

    cy.visit('http://localhost:3000')


  })
  
  it('should display a 400 level error', () => {
    cy.intercept("GET", "http://localhost:3001/api/v1/tricks", {
      statusCode: 400,
      fixture: 'tricks.json'
    }).as('getTricks')

    cy.wait('@getTricks').then((interception) => {
      cy.get('main').contains('h2', 'Error 400: Please try again')
      })
  })

  it('should display a 400 level error for a post', () => {
    cy.intercept("GET", "http://localhost:3001/api/v1/tricks", {
      statusCode: 200,
      fixture: 'tricks.json'
    }).as('getTricks')

    cy.wait('@getTricks').then((interception) => {
      cy.get('select').first().select('regular')
        .get('input[type="text"]').first().type('new trick')
        .get('select').last().select('stairs')
        .get('input[type="text"]').last().type('www.example.com')
        .get('button').contains('Send it!').click()
        cy.wait('@postTrick').then((interception) => {
          cy.get('main').contains('h2', 'Error 400: Please try again')
        })
      })
  })
})