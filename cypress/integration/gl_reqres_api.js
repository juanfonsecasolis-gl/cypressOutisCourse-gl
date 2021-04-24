// 2021 Juan Fonseca

let userID; // created user ID to be deleted to hide my name 

describe('Test 8: Verify pagination returns the same number of items specified on the "per_page" property	', () => {

    it('should invoke the GET request and verify per_page users were returned', () => {
        // TODO: find a way to add a second baseUrl (like $ npm run cypress:open --config "baseUrl=myUrl")
        cy.request('https://reqres.in/api/users?page=1').then((response) => {   
            expect(response.status).to.eq(200)
            expect(response.body).property('data').property('length')
                .eq(response.body.per_page)
        })
    })

})

describe('Test 9: verify that each user returned contains personal information', () => {

    it('should invoke the GET request and check the fields', () => {
        cy.request('https://reqres.in/api/users?page=1').its('body').as('body')
        cy.get('@body').its('data').then(int => {
            int.forEach(element => {
                expect(element).to.have.property('email')
            });
        })
        
    })

})

describe('Test 10: verify that each user returned contains personal information', () => {

    it('should invoke the GET request and check the fields', () => {
        cy.request('https://reqres.in/api/users?page=1').its('body').as('body')
        cy.get('@body').its('data').then(int => {
            int.forEach(element => {
                var pattern = /[a-zA-Z0-9]@[a-zA-Z0-9].[a-z]+/g;
                var match = element.email.match(pattern)
                cy.log(match) 
                expect(match).is.not.null
            });
        })
        
    })
})

describe('Test 11: verify that users can be created via POST invoking "/api/users"', () => {

    it('should invoke the POST request and check the fields', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body:{
                'name': 'jfonseca_test',
                'job': 'tester'
            },
            failOnStatusCode: true
        }).then((response) => {
            expect(response.status).to.eq(201)
            cy.log(JSON.stringify(response.body))
            expect(response.body.name).to.eq('jfonseca_test')
            expect(response.body.job).to.eq('tester')
            userID = response.body.id   // global variable
            cy.log(`Created user with ID ${userID}`)
        })
    })
})

describe('Test 12: verify that users can be deleted', () => {

    it('should invoke the DELETE request and check that status 204 was returned', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/users/${userID}'
        }).then((response) => {
            expect(response.status).to.eq(204)
            cy.log(`Deleted user with ID ${userID}`)
        })
    })
})