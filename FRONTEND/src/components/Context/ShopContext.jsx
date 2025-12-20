// src/components/Context/ShopContext.jsx
import { createContext, useState } from "react";
import { addToCartApi } from "../../auth";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (productId, size) => {
        try {
            await addToCartApi(productId, size); // backend call
            setCartItems((prev) => ({
                ...prev,
                [productId]: (prev[productId] || 0) + 1,
            }));
        } catch (err) {
            alert("Failed to add to cart");
        }
    };
    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    };

    const value = {
        cartItems,
        addToCart,
        getTotalCartItems, 
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};
export default ShopContext;