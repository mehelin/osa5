describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Rumpali Rampuli',
      username: 'Rumppis',
      password: 'salasana',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Blogs');
  });

  it('login form can be opened', function () {
    cy.contains('Log in').click();
  });

  describe('Login', function () {
    it('user can login with correct credentials', function () {
      cy.contains('Log in').click();
      cy.get('#username').type('Rumppis');
      cy.get('#password').type('salasana');
      cy.get('#login-button').click();
      cy.contains('Rumpali Rampuli is logged in');
      cy.get('.notification').should(
        'have.css',
        'border-color',
        'rgb(0, 128, 0)'
      );
    });

    it('login fails with wrong credentials', function () {
      cy.contains('Log in').click();
      cy.get('#username').type('sukkuruu');
      cy.get('#password').type('rudolf');
      cy.get('#login-button').click();
      cy.get('.warning')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)');
      cy.get('html').should('not.contain', 'Rumpali Rampuli is logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Rumppis', password: 'salasana' });
    });

    it('a new blog can be created', function () {
      cy.contains('New blog').click();
      cy.get('#titleInput').type('Kukkamaa');
      cy.get('#authorInput').type('Neiti näppärä');
      cy.get('#urlInput').type('kukkamaa.com');
      cy.get('#newBlogButton').click();
      cy.get('html').should('contain', 'Kukkamaa tehnyt Neiti näppärä');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Testaus',
          author: 'Testi MH',
          url: 'testi.com',
          likes: 0,
        });
      });

      it('it can be liked', function () {
        cy.contains('Testaus');
        cy.contains('View').click();
        cy.get('.likeButton').click();
        cy.get('.likeContainer').contains('1 like');
        cy.get('.likeButton').click();
        cy.get('.likeContainer').contains('2 likes');
      });
    });

    describe('blog can be created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Testaus',
          author: 'Testi NN',
          url: 'testi.com',
          likes: 0,
        });
      });

      it('and deleted by creator', function () {
        cy.contains('Testaus');
        cy.contains('View').click();
        cy.contains('Remove').click();
        cy.get('html').should('not.contain', 'Testaus');
      });
    });

    describe('several blogs can be created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'BadBlog',
          author: 'Testi 1',
          url: 'testi.com3',
          likes: 3,
        });
        cy.createBlog({
          title: 'OkBlog',
          author: 'Testi 2',
          url: 'testi.com2',
          likes: 15,
        });
        cy.createBlog({
          title: 'NojooBlog',
          author: 'Testi 3',
          url: 'testi.com1',
          likes: 5,
        });
      });

      it('and they are automatically sorted by likes', function () {
        cy.get('.blog-container>.blogTitle').should((items) => {
          expect(items[0]).to.contain('OkBlog');
          expect(items[1]).to.contain('NojooBlog');
          expect(items[2]).to.contain('BadBlog');
        });
      });
    });
  });
});
