import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlogMockHandler = jest.fn();

  const component = render(<BlogForm createBlog={createBlogMockHandler} />);

  const titleInput = component.container.querySelector('.titleInput');
  const authorInput = component.container.querySelector('.authorInput');
  const urlInput = component.container.querySelector('.urlInput');
  const form = component.container.querySelector('form');

  fireEvent.change(titleInput, {
    target: { value: 'PumppisBlogi' },
  });
  fireEvent.change(authorInput, {
    target: { value: 'Pumppis' },
  });
  fireEvent.change(urlInput, {
    target: { value: 'http://pumppis.com' },
  });
  fireEvent.submit(form);

  expect(createBlogMockHandler.mock.calls).toHaveLength(1);
  expect(createBlogMockHandler.mock.calls[0][0].title).toBe('PumppisBlogi');
  expect(createBlogMockHandler.mock.calls[0][0].author).toBe('Pumppis');
  expect(createBlogMockHandler.mock.calls[0][0].url).toBe('http://pumppis.com');
});
