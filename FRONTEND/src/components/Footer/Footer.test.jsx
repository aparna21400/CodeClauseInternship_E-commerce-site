import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  test('renders footer component', () => {
    render(<Footer />);
    expect(screen.getByText('SHOPCASE')).toBeInTheDocument();
  });

  test('renders footer logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText('Shopcase big logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders footer links', () => {
    render(<Footer />);
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Offices')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('renders social media icons', () => {
    render(<Footer />);
    expect(screen.getByAltText('Instagram')).toBeInTheDocument();
    expect(screen.getByAltText('Pinterest')).toBeInTheDocument();
    expect(screen.getByAltText('WhatsApp')).toBeInTheDocument();
  });

  test('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/Copyright @ 2025-All Right Reserved/i)).toBeInTheDocument();
  });
});
