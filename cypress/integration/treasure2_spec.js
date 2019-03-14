describe('treasure2 spec', function(){

    before(function(){
        cy.signin();
        })

    after(function(){
        cy.signout();
    })

    it("loads the treasure page again", function(){
        cy.fixture('user').then(({username,password})=>{
            cy.visit('/treasure')

            cy.contains("username")

            console.log(localStorage.getItem("id-key"))
            console.log(sessionStorage.getItem("session-key"))

            expect(sessionStorage.getItem('session-key')).to.contain("Clef");
//            expect(localStorage.getItem('id-key')).to.contain("Klic");
            cy.get("p#test-area").contains("KlicTotoznosti")

//            expect(localStorage.getItem('id-key')).to.eq('KlicTotoznosti')
//              expect(sessionStorage.getItem('session-key')).to.eq('ClefSeance')


        })


        //console.log("DEBUG authCookie " + JSON.stringify(authCookie))
        //cy.setCookie('id_token', 'OK')

    })

    it("leaves a message", function(){

        cy.get('textarea').clear()
        cy.get('textarea').type("Dread natty dread...")
        cy.get('button:contains("Submit")').click();

        cy.get('p.message').should(($e) => {
            expect($e.first()).to.contain('Dread natty dread...')

        })

    })

    it('preserves storage items', function(){

        expect(localStorage.getItem('id-key')).to.eq('KlicTotoznosti')
        expect(sessionStorage.getItem('session-key')).to.eq('ClefSeance')

        })

    it("fails on purpose", function(){
        expect(true).to.equal(false)
    })


})