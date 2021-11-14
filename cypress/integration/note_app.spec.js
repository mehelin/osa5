describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  
  it('Login form is shown', function() {
    cy.contains('Blogs')
    cy.contains('Blog app, Department of Computer Science, University of Helsinki 2021')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      // ...
    })

    it('fails with wrong credentials', function() {
      // ...
    })

  it('user can login with good credentials', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
  
    cy.contains('Matti Luukkainen logged in')
  })
  
  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
  
    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
  
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })
  
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })
  
    it('a new Blog can be created', function() {
      cy.contains('new Blog').click()
      cy.get('input').type('a Blog created by cypress')
      cy.contains('save').click()
      cy.contains('a Blog created by cypress')
    })
  
    describe('and a Blog exists', function () {
      describe('and several Blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({ content: 'first Blog', important: false })
          cy.createBlog({ content: 'second Blog', important: false })
          cy.createBlog({ content: 'third Blog', important: false })
        })
        it('one of those can be made important', function () {
          cy.contains('second Blog').parent().find('button').as('theButton')
          cy.get('@theButton').click()
          cy.get('@theButton').should('contain', 'make not important')
        })
      })
    })
  })
})
}