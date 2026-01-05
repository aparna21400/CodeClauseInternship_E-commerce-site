import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

// Mock child components
jest.mock('../components/Hero/Hero', () => {
  return function MockHero() {
    return <div data-testid="hero">Hero Component</div>;
  };
});

jest.mock('../components/Popular/Popular', () => {
  return function MockPopular() {
    return <div data-testid="popular">Popular Component</div>;
  };
});

jest.mock('../components/Offer/Offers', () => {
  return function MockOffers() {
    return <div data-testid="offers">Offers Component</div>;
  };
});

jest.mock('../components/NewCollections/NewCollections', () => {
  return function MockNewCollections() {
    return <div data-testid="new-collections">New Collections Component</div>;
  };
});

jest.mock('../components/NewsLetter/NewsLetter', () => {
  return function MockNewsLetter() {
    return <div data-testid="newsletter">NewsLetter Component</div>;
  };
});

describe('Home Component', () => {
  test('renders all main sections', () => {
    render(<Home />);
    
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('popular')).toBeInTheDocument();
    expect(screen.getByTestId('offers')).toBeInTheDocument();
    expect(screen.getByTestId('new-collections')).toBeInTheDocument();
    expect(screen.getByTestId('newsletter')).toBeInTheDocument();
  });

  test('renders components in correct order', () => {
    const { container } = render(<Home />);
    const children = Array.from(container.firstChild.children);
    
    expect(children[0]).toHaveAttribute('data-testid', 'hero');
    expect(children[1]).toHaveAttribute('data-testid', 'popular');
    expect(children[2]).toHaveAttribute('data-testid', 'offers');
    expect(children[3]).toHaveAttribute('data-testid', 'new-collections');
    expect(children[4]).toHaveAttribute('data-testid', 'newsletter');
  });
});
