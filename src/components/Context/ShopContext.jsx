import React, { createContext, useState, useEffect } from "react";
import all_product from '../assests/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    return [];
}

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    useEffect(() => {
    }, [cartItems]);

    const addToCart = (itemId, size) => {
        setCartItems((prev) => {
            const existingItemIndex = prev.findIndex(
                item => item.id === itemId && item.size === size
            );

            if (existingItemIndex !== -1) {
                const updatedItems = [...prev];
                updatedItems[existingItemIndex].quantity += 1;
                console.log("Updated existing cart item:", updatedItems[existingItemIndex]);
                return updatedItems;
            } else {
                const newItem = { id: itemId, size: size, quantity: 1 };
                console.log("Added new cart item:", newItem);
                return [...prev, newItem];
            }
        });
    }

    const removeFromCart = (itemId, size) => {
        setCartItems((prev) => {
            const existingItemIndex = prev.findIndex(
                item => item.id === itemId && item.size === size
            );

            if (existingItemIndex !== -1) {
                const updatedItems = [...prev];
                if (updatedItems[existingItemIndex].quantity > 1) {
                    updatedItems[existingItemIndex].quantity -= 1;
                } else {
                    updatedItems.splice(existingItemIndex, 1);
                }
                return updatedItems;
            }
            return prev;
        });
    }

    const getProductById = (productId) => {
        return all_product.find((product) => product.id === Number(productId));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        cartItems.forEach(cartItem => {
            const itemInfo = getProductById(cartItem.id);
            if (itemInfo) {
                totalAmount += itemInfo.new_price * cartItem.quantity;
            }
        });
        return totalAmount;
    }

    const getTotalCartItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    const getCartItemQuantity = (itemId, size) => {
        const item = cartItems.find(item => item.id === itemId && item.size === size);
        return item ? item.quantity : 0;
    }

    const isItemInCart = (itemId) => {
        return cartItems.some(item => item.id === itemId);
    }

    const getCartItemsWithDetails = () => {
        return cartItems.map(cartItem => {
            const productInfo = getProductById(cartItem.id);
            return {
                ...cartItem,
                productInfo: productInfo
            };
        });
    }

    const contextValue = { 
        getTotalCartAmount, 
        getTotalCartItems, 
        all_product, 
        cartItems, 
        addToCart, 
        removeFromCart,
        getCartItemQuantity,
        isItemInCart,
        getCartItemsWithDetails,
        getProductById
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;