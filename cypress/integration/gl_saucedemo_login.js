// 2021 Juan Fonseca

class BasePage{}

class LoginPage extends BasePage {
    
    static loginWithValidCredentials(){
        cy.viewport('samsung-note9')
        cy.fixture('user').then(user => {
            cy.log('Login with valid user')
            cy.login(user.validUsername, user.validPassword)    // defined on commands.js
        })
    }

    static loginWithInvalidCredentials(){
        cy.fixture('user').then(user => {
            cy.log('Login with invalid user')
            cy.login(user.invalidUsername, user.invalidPassword) // defined on commands.js
        })
    }
}

describe('Verify system handles invalid credentials', () => {

    it('should stay in the same page even using invalid credentials', () => {
        LoginPage.loginWithInvalidCredentials()
        cy.url().should('include','/')
    })
    
    it('should get an error message',() => {
        cy.readFile('testData.json').its('invalidLoginMessage').then(text => {
            cy.get('h3').contains(text)
        })
    })
})

describe('Verify system handles valid credentials',() => {
    
    it('should login and check that url points to the inventory',() => {
        LoginPage.loginWithValidCredentials()
        cy.url().should('include','/inventory.html')
    })

    it('should count a maximum of 6 items displayed',() => {
        cy.get('.inventory_item').its('length').should('eq',6)
    })

})