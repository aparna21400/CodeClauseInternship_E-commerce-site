import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './navbar';
import { ShopContext } from '../Context/ShopContext';

// Mock the context value
const mockContextValue = {
  getTotalCartItems: jest.fn(() => 5),
  token: '',
  setToken: jest.fn(),
};

const renderWithRouter = (component, contextValue = mockContextValue) => {
  return render(
    <ShopContext.Provider value={contextValue}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </ShopContext.Provider>
  );
};

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders logo and brand name', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByText('SHOPCASE')).toBeInTheDocument();
    expect(screen.getByAltText('Shopcase Logo')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Men')).toBeInTheDocument();
    expect(screen.getByText('Women')).toBeInTheDocument();
    expect(screen.getByText('Kids')).toBeInTheDocument();
  });

  test('renders login button when user is not logged in', () => {
    renderWithRouter(<Navbar />);
    
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
  });

  test('renders logout button when user is logged in', () => {
    const loggedInContext = {
      ...mockContextValue,
      token: 'mock-token-123',
    };
    
    renderWithRouter(<Navbar />, loggedInContext);
    
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
  });

  test('displays cart icon', () => {
    renderWithRouter(<Navbar />);
    
    const cartIcon = screen.getByAltText('cart');
    expect(cartIcon).toBeInTheDocument();
  });

  test('displays cart item count', () => {
    renderWithRouter(<Navbar />);
    
    expect(mockContextValue.getTotalCartItems).toHaveBeenCalled();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('toggles mobile menu when hamburger button is clicked', () => {
    renderWithRouter(<Navbar />);
    
    const mobileMenuToggle = screen.getByLabelText('Toggle navigation menu');
    expect(mobileMenuToggle).toBeInTheDocument();
    
    fireEvent.click(mobileMenuToggle);
    expect(mobileMenuToggle).toHaveClass('active');
  });

  test('calls setToken and navigates on logout', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    const loggedInContext = {
      ...mockContextValue,
      token: 'mock-token-123',
      setToken: jest.fn(),
    };
    
    renderWithRouter(<Navbar />, loggedInContext);
    
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    expect(loggedInContext.setToken).toHaveBeenCalledWith('');
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });

  test('menu items update active state on click', () => {
    renderWithRouter(<Navbar />);
    
    const menLink = screen.getByText('Men').closest('li');
    fireEvent.click(menLink);
    
    expect(menLink).toBeInTheDocument();
  });
});
