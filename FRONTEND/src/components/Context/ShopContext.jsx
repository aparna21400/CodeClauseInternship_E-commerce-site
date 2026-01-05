import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const ShopContext = createContext();
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const ShopContextProvider = ({ children }) => {

    // Global States
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [loading, setLoading] = useState(true);

    //Fetch Products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            console.log("🔄 Fetching from:", `${backendUrl}/api/product/list`);

            const res = await axios.get(`${backendUrl}/api/product/list`);
            console.log("📦 Response:", res.data);

            if (res.data.success) {
                setProducts(res.data.products);
                console.log("✅ Products loaded:", res.data.products.length);
            } else {
                console.error("❌ Failed:", res.data.message);
            }
        } catch (error) {
            console.error("❌ Fetch products error:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch Cart
    const fetchCart = async () => {
        if (!token) return;

        try {
            const res = await axios.get(
                `${backendUrl}/api/cart/get`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                setCartItems(res.data.cartData);
            }
        } catch (error) {
            console.log('❌ Fetch cart error:', error.message);
        }
    };

    // Add to Cart
    const addToCart = async (productId, size) => {
        if (!token) {
            alert("Please login first");
            return;
        }

        try {
            await axios.post(
                `${backendUrl}/api/cart/add`,
                { productId, size },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setCartItems((prev) => ({
                ...prev,
                [productId]: {
                    ...prev[productId],
                    [size]: (prev[productId]?.[size] || 0) + 1
                }
            }));
        } catch (error) {
            console.log("❌ Add to cart error:", error.message);
        }
    };

    //Remove from Cart
     const removeFromCart = async (productId, size) => {
        if (!token) return;
        
        try {
            await axios.post(
                `${backendUrl}/api/cart/remove`,
                { productId, size },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setCartItems((prev) => {
                const updated = { ...prev };
                if (updated[productId] && updated[productId][size]) {
                    if (updated[productId][size] > 1) {
                        updated[productId][size] -= 1;
                    } else {
                        delete updated[productId][size];
                        if (Object.keys(updated[productId]).length === 0) {
                            delete updated[productId];
                        }
                    }
                }
                return updated;
            });

        } catch (error) {
            console.log("Remove cart error:", error.message);
        }
    };

    // Step 6: Get Total Cart Items
    const getTotalCartItems = () => {
        let total = 0;
        for (let productId in cartItems) {
            for (let size in cartItems[productId]) {
                total += cartItems[productId][size];
            }
        }
        return total;
    };

    // Step 7: Get Total Cart Amount
    const getTotalCartAmount = () => {
        let total = 0;
        for (let productId in cartItems) {
            const product = products.find(p => p._id === productId);
            if (product) {
                for (let size in cartItems[productId]) {
                    total += product.new_price * cartItems[productId][size];
                }
            }
        }
        return total;
    };

    // Step 8: Get Cart Items with Details
    const getCartItemsWithDetails = () => {
        const items = [];
        for (let productId in cartItems) {
            const productInfo = products.find(p => p._id === productId);
            for (let size in cartItems[productId]) {
                items.push({
                    id: productId,
                    size: size,
                    quantity: cartItems[productId][size],
                    productInfo: productInfo
                });
            }
        }
        return items;
    };

    // Step 9: Effects
    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (token) {
            fetchCart();
        }
    }, [token]);

    // Step 10: Context Value
    const value = {
        products,
        all_product: products, 
        cartItems,
        token,
        setToken,
        loading,
        fetchProducts,
        addToCart,
        removeFromCart,
        getTotalCartItems,
        getTotalCartAmount,
        getCartItemsWithDetails
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContext;