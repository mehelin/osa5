import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Testing Blog component', () => {
  const testBlog = {
    title: 'Rumppis',
    author: 'Rumpali Rampuli',
    url: 'http://google.com',
    likes: 98765,
    user: {
      username: 'Mister Mahtava',
      name: 'Mahtis',
    },
  };

  let component;
  const likeMockHandler = jest.fn();

  beforeEach(() => {
    component = render(<Blog blog={testBlog} blogUpdate={likeMockHandler} />);
  });

  test('renders content', () => {

    // tapa 1
    expect(component.container).toHaveTextContent('Rumppis');

    expect(component.container.user).toBeUndefined();
    expect(component.container.likes).toBeUndefined();

    // tapa 2
    const element = component.getByText('Rumpali Rampuli');
    expect(element).toBeDefined();

    // tapa 3
    const div = component.container.querySelector('.blog-container');
    expect(div).toHaveTextContent('Pupu Rumpali Rampuli');
  });

  test('renders blogs title and author, but not likes and url', () => {
    expect(component.container).toHaveTextContent(testBlog.title);
    expect(component.container).toHaveTextContent(testBlog.author);

    const contentHiddenByDefault = component.container.querySelector(
      '.hiddenByDefault'
    );
    expect(contentHiddenByDefault).toHaveStyle('display: none');
    expect(contentHiddenByDefault).not.toBeVisible();
  });

  test('renders additional content (likes, url) when View button is pressed', () => {
    const button = component.container.querySelector('button');
    fireEvent.click(button);

    const contentHiddenByDefault = component.container.querySelector(
      '.hiddenByDefault'
    );
    expect(contentHiddenByDefault).not.toHaveStyle('display: none');
    expect(contentHiddenByDefault).toBeVisible();

    expect(contentHiddenByDefault).toHaveTextContent(testBlog.likes);
    expect(contentHiddenByDefault).toHaveTextContent(testBlog.url);
  });

  test('if the Like button is clicked twice, the event handler is also called twice', () => {
    const viewButton = component.getByText('View');
    fireEvent.click(viewButton);

    const likeButton = component.getByText('Like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });
});