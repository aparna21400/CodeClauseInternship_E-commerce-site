import React from 'react';
import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import { ShopContextProvider, ShopContext } from './ShopContext';

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

describe('ShopContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('provides initial context values', () => {
    const wrapper = ({ children }) => (
      <ShopContextProvider>{children}</ShopContextProvider>
    );

    const { result } = renderHook(() => {
      const context = React.useContext(ShopContext);
      return context;
    }, { wrapper });

    expect(result.current.products).toEqual([]);
    expect(result.current.cartItems).toEqual({});
    expect(result.current.token).toBe('');
    expect(result.current.loading).toBe(true);
  });

  test('fetches products on mount', async () => {
    const mockProducts = [
      { _id: '1', name: 'Product 1', new_price: 100 },
      { _id: '2', name: 'Product 2', new_price: 200 },
    ];

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        success: true,
        products: mockProducts,
      },
    });

    const wrapper = ({ children }) => (
      <ShopContextProvider>{children}</ShopContextProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => {
      const context = React.useContext(ShopContext);
      return context;
    }, { wrapper });

    await waitForNextUpdate();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/api/product/list')
    );
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.loading).toBe(false);
  });

  test('calculates total cart items correctly', () => {
    const wrapper = ({ children }) => (
      <ShopContextProvider>{children}</ShopContextProvider>
    );

    const { result } = renderHook(() => {
      const context = React.useContext(ShopContext);
      return context;
    }, { wrapper });

    act(() => {
      result.current.cartItems = {
        'product1': { 'M': 2, 'L': 1 },
        'product2': { 'S': 3 },
      };
    });

    const total = result.current.getTotalCartItems();
    expect(total).toBe(6); // 2 + 1 + 3
  });

  test('calculates total cart amount correctly', () => {
    const mockProducts = [
      { _id: 'product1', name: 'Product 1', new_price: 100 },
      { _id: 'product2', name: 'Product 2', new_price: 200 },
    ];

    const wrapper = ({ children }) => (
      <ShopContextProvider>{children}</ShopContextProvider>
    );

    const { result } = renderHook(() => {
      const context = React.useContext(ShopContext);
      return context;
    }, { wrapper });

    act(() => {
      result.current.products = mockProducts;
      result.current.cartItems = {
        'product1': { 'M': 2 },
        'product2': { 'S': 1 },
      };
    });

    const total = result.current.getTotalCartAmount();
    expect(total).toBe(400); // (100 * 2) + (200 * 1)
  });

  test('getCartItemsWithDetails returns correct structure', () => {
    const mockProducts = [
      { _id: 'product1', name: 'Product 1', new_price: 100 },
    ];

    const wrapper = ({ children }) => (
      <ShopContextProvider>{children}</ShopContextProvider>
    );

    const { result } = renderHook(() => {
      const context = React.useContext(ShopContext);
      return context;
    }, { wrapper });

    act(() => {
      result.current.products = mockProducts;
      result.current.cartItems = {
        'product1': { 'M': 2 },
      };
    });

    const items = result.current.getCartItemsWithDetails();
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      id: 'product1',
      size: 'M',
      quantity: 2,
      productInfo: mockProducts[0],
    });
  });

  test('addToCart shows alert when user is not logged in', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const wrapper = ({ children }) => (
      <ShopContextProvider>{children}</ShopContextProvider>
    );

    const { result } = renderHook(() => {
      const context = React.useContext(ShopContext);
      return context;
    }, { wrapper });

    await act(async () => {
      await result.current.addToCart('product1', 'M');
    });

    expect(alertSpy).toHaveBeenCalledWith('Please login first');
    alertSpy.mockRestore();
  });

  test('addToCart makes API call when user is logged in', async () => {
    const mockToken = 'mock-token-123';
    localStorage.setItem('token', mockToken);

    mockedAxios.post.mockResolvedValueOnce({
      data: { success: true },
    });

    const wrapper = ({ children }) => (
      <ShopContextProvider>{children}</ShopContextProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => {
      const context = React.useContext(ShopContext);
      return context;
    }, { wrapper });

    await waitForNextUpdate();

    act(() => {
      result.current.token = mockToken;
    });

    await act(async () => {
      await result.current.addToCart('product1', 'M');
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/api/cart/add'),
      { productId: 'product1', size: 'M' },
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
  });

  test('setToken updates token in context and localStorage', () => {
    const wrapper = ({ children }) => (
      <ShopContextProvider>{children}</ShopContextProvider>
    );

    const { result } = renderHook(() => {
      const context = React.useContext(ShopContext);
      return context;
    }, { wrapper });

    act(() => {
      result.current.setToken('new-token-123');
    });

    expect(result.current.token).toBe('new-token-123');
    expect(localStorage.getItem('token')).toBe('new-token-123');
  });
});
