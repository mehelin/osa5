import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  // handlereiden vaihto
  const handleTitleChange = (event) => {
    console.log(event.target.value);
    setNewBlogTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    console.log(event.target.value);
    setNewBlogAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    console.log(event.target.value);
    setNewBlogUrl(event.target.value);
  };

  // luodaan uusi objekti
  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });

    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');
  };

  return (
    <div className="formDiv">
      <h2>Lisää uusi blogi</h2>
      <form onSubmit={addBlog}>
        <p>
          Otsikko:{' '}
          <input
            id="titleInput"
            value={newBlogTitle}
            onChange={handleTitleChange}
            className="titleInput"
          />
        </p>
        <p>
          Kirjoittaja:{' '}
          <input
            id="authorInput"
            value={newBlogAuthor}
            onChange={handleAuthorChange}
            className="authorInput"
          />
        </p>
        <p>
          Url:{' '}
          <input
            id="urlInput"
            value={newBlogUrl}
            onChange={handleUrlChange}
            className="urlInput"
          />
        </p>
        <button id="newBlogButton" type="submit">
          Lisää
        </button>
      </form>
    </div>
  );
};

export default BlogForm;