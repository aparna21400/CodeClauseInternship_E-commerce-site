import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ShopContextProvider } from './components/Context/ShopContext';

// Mock the components that might have complex dependencies
jest.mock('./components/navbar/navbar', () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">Navbar</nav>;
  };
});

jest.mock('./components/Footer/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>;
  };
});

jest.mock('./pages/Home', () => {
  return function MockHome() {
    return <div data-testid="home-page">Home Page</div>;
  };
});

jest.mock('./pages/Category', () => {
  return function MockCategory() {
    return <div data-testid="category-page">Category Page</div>;
  };
});

jest.mock('./pages/Product', () => {
  return function MockProduct() {
    return <div data-testid="product-page">Product Page</div>;
  };
});

jest.mock('./pages/ProductCart', () => {
  return function MockProductCart() {
    return <div data-testid="product-cart-page">Product Cart Page</div>;
  };
});

jest.mock('./pages/LoginSignup', () => {
  return function MockLoginSignup() {
    return <div data-testid="login-signup-page">Login Signup Page</div>;
  };
});

jest.mock('./components/cartItems/CartItems', () => {
  return function MockCartItems() {
    return <div data-testid="cart-items-page">Cart Items Page</div>;
  };
});

jest.mock('./pages/Checkout', () => {
  return function MockCheckout() {
    return <div data-testid="checkout-page">Checkout Page</div>;
  };
});

jest.mock('./pages/OrderSuccess', () => {
  return function MockOrderSuccess() {
    return <div data-testid="order-success-page">Order Success Page</div>;
  };
});

jest.mock('./pages/Orders', () => {
  return function MockOrders() {
    return <div data-testid="orders-page">Orders Page</div>;
  };
});

const renderWithProviders = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <ShopContextProvider>
      {ui}
    </ShopContextProvider>
  );
};

describe('App Component', () => {
  test('renders navbar and footer', () => {
    renderWithProviders(<App />);
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('renders home page on root route', () => {
    renderWithProviders(<App />, { route: '/' });
    
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  test('renders mens category page on /mens route', () => {
    renderWithProviders(<App />, { route: '/mens' });
    
    expect(screen.getByTestId('category-page')).toBeInTheDocument();
  });

  test('renders womens category page on /womens route', () => {
    renderWithProviders(<App />, { route: '/womens' });
    
    expect(screen.getByTestId('category-page')).toBeInTheDocument();
  });

  test('renders kids category page on /kids route', () => {
    renderWithProviders(<App />, { route: '/kids' });
    
    expect(screen.getByTestId('category-page')).toBeInTheDocument();
  });

  test('renders product page on /product/:productId route', () => {
    renderWithProviders(<App />, { route: '/product/123' });
    
    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });

  test('renders login page on /Login route', () => {
    renderWithProviders(<App />, { route: '/Login' });
    
    expect(screen.getByTestId('login-signup-page')).toBeInTheDocument();
  });

  test('renders cart page on /cart route', () => {
    renderWithProviders(<App />, { route: '/cart' });
    
    expect(screen.getByTestId('cart-items-page')).toBeInTheDocument();
  });

  test('renders checkout page on /checkout route', () => {
    renderWithProviders(<App />, { route: '/checkout' });
    
    expect(screen.getByTestId('checkout-page')).toBeInTheDocument();
  });
});
