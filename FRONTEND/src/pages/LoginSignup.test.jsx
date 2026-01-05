import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import LoginSignup from './LoginSignup';
import { ShopContext } from '../components/Context/ShopContext';

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockContextValue = {
  setToken: jest.fn(),
};

const renderWithProviders = (component) => {
  return render(
    <ShopContext.Provider value={mockContextValue}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </ShopContext.Provider>
  );
};

describe('LoginSignup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders login form by default', () => {
    renderWithProviders(<LoginSignup />);
    
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('can switch to signup form', () => {
    renderWithProviders(<LoginSignup />);
    
    const signupTab = screen.getByText('Signup');
    fireEvent.click(signupTab);
    
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
  });

  test('handles login form input changes', () => {
    renderWithProviders(<LoginSignup />);
    
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('handles signup form input changes', () => {
    renderWithProviders(<LoginSignup />);
    
    // Switch to signup form
    const signupTab = screen.getByText('Signup');
    fireEvent.click(signupTab);
    
    const nameInput = screen.getByPlaceholderText('Full Name');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('submits login form successfully', async () => {
    const mockResponse = {
      data: {
        success: true,
        token: 'mock-token-123',
        message: 'Login successful',
      },
    };
    
    mockedAxios.post.mockResolvedValueOnce(mockResponse);
    
    renderWithProviders(<LoginSignup />);
    
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Login');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/user/login'),
        {
          email: 'test@example.com',
          password: 'password123',
        }
      );
    });
    
    await waitFor(() => {
      expect(mockContextValue.setToken).toHaveBeenCalledWith('mock-token-123');
    });
  });

  test('handles login error', async () => {
    const mockError = {
      response: {
        data: {
          success: false,
          message: 'Invalid credentials',
        },
      },
    };
    
    mockedAxios.post.mockRejectedValueOnce(mockError);
    
    renderWithProviders(<LoginSignup />);
    
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Login');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('submits signup form successfully', async () => {
    const mockResponse = {
      data: {
        success: true,
        token: 'mock-token-456',
        message: 'Account created successfully',
      },
    };
    
    mockedAxios.post.mockResolvedValueOnce(mockResponse);
    
    renderWithProviders(<LoginSignup />);
    
    // Switch to signup form
    const signupTab = screen.getByText('Signup');
    fireEvent.click(signupTab);
    
    const nameInput = screen.getByPlaceholderText('Full Name');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Signup');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/user/register'),
        {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        }
      );
    });
  });

  test('shows loading state during form submission', async () => {
    mockedAxios.post.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        data: { success: true, token: 'token' }
      }), 100))
    );
    
    renderWithProviders(<LoginSignup />);
    
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Login');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Logging in...')).toBeInTheDocument();
  });
});
