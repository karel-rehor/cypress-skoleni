// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//cy.request({method: 'POST',url: '/login', body: { 'username': 'fritz', 'password': 'thecat'}, form: true})

Cypress.Cookies.debug()

Cypress.Cookies.defaults({
    whitelist: ['id_token','username']
})

export const setupUser = () => {
    return cy.fixture('user').then(({username, password}) => {

        console.log("setupUser: username: " + username)
        console.log("setupUser: password: " + password)

        return cy.request({
            method: 'POST',
            url: '/accounts',
            body: {name: username, password: password},
        })
    })
}

export const signin = () => {
  return cy.fixture('user').then(({username, password, org, bucket}) => {
    return cy.setupUser().then(body => {
      return cy
        .request({
          method: 'POST',
          url: '/login',
          body: { 'username' : username, 'password' : password},
          form: true
        })
        .then(() => {
          return cy.wrap(body)
        })
    })
  })
}

export const signout = () => {
    return cy.request(
        {
            method: 'GET',
            url: '/logout'
        }

    )
}

// auth flow
Cypress.Commands.add("setupUser", setupUser)
Cypress.Commands.add('signin', signin)
Cypress.Commands.add('signout', signout)


