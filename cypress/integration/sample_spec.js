describe('POC test', function(){

  beforeEach(function(){
    cy.exec("ls -alh")
  })

  it('Finds and element', function(){
    cy.visit("/")

    //cy.pause()
    //expect(true).to.equal(true);
    cy.contains('Submit').click()

    //cy.url().should('include', '/commands/actions')

    //cy.get('.action-email').type('fake@email.com')
    //.should('have.value', 'fake@email.com')
    cy.get('td#c1x1').should(($el) => {
      expect($el).to.have.css('background-color', "rgb(136, 255, 136)")
    })
    cy.get('td#c1x1').click()

    cy.get('td#c1x1').should(($el) => {
      expect($el).to.have.css('background-color', "rgb(255, 136, 136)")
    })


    cy.get('form#testForm input').clear()
    cy.get('form#testForm input').type('Hurra!')


  })
})
