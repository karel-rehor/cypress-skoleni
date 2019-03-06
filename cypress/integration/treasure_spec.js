describe("The treasure page", function(){

    before(function(){
    //    cy.request('POST', '/accounts', { name: 'fritz', password: 'thecat' })
    //        .then((res) => {
    //            expect(res.body).to.have.string('fritz')
     //       })

        cy.signin()

    })


    /*
    it('logs in programmatically without using the UI', function(){

        const {username, password} = { name: 'fritz', password: 'thecat'}

        cy.request({method: 'POST',url: '/login', body: { 'username': 'fritz', 'password': 'thecat'}, form: true})

       // cy.getCookie('id_token').should('exist')
       // cy.getCookie('username').should('exist')

        //console.log("DEBUG id_token " + JSON.stringify(cy.getCookie('id_token')))
*/
        /*
        authCookie = cy.getCookie('id_token')

        console.log("cookies " + JSON.stringify(cy.getCookies()))

        console.log("authCookie.name " + authCookie.name)
        console.log("authCookie.value " + authCookie.value)
        console.log("authCookie.expiry " + authCookie.expiry)

        //console.log("DEBUG authCookie " + JSON.stringify(authCookie))
*//*
        cy.request('/treasure')

    }) */

    it("loads the treasure page", function(){

       // console.log("DEBUG authCookie " + JSON.stringify(authCookie))
        //cy.setCookie('id_token', 'OK')
        cy.visit('/treasure')

    })


})