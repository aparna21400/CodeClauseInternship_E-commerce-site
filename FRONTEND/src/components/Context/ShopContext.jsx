import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { addToCartApi } from "../../auth";

export const ShopContext = createContext();
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const ShopContextProvider = ({ children }) => {

    {/* GLOBAL STATES*/ }
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || "");


    {/*PRODUCT APIs */ }
    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/product/list`);
            if (res.data.sucess) {
                setProducts(res.data.products);
            }
        } catch (error) {
            console.log("Fetch products error:", error.message);
        }
    };

    {/* CART APIs */ }

    const fetchCart = async () => {
        if (!token) return;

        try {
            const res = await axios.get(
                `$ {backendUrl}/api/cart/get`,
                { headers: { token } }
            );

            if (res.data.success) {
                setCartItems(res.data.cartData);
            }

        } catch (error) {
            console.log('Fetch cart error:', error.message);
        }
    };

    const addToCart = async (productId, size) => {
        if (!token) return alert("Please login first");
        try {
            await axios.post(`${backendUrl}/api/cart/add`, { productId, size }, { headers: { token } });
            setCartItems((prev) => ({
                ...prev,
                [productId]: {
                    ...prev[productId],
                    [size]: (prev[productId]?.[size] || 0) + 1
                }
            }));
        } catch (error) {
            console.log("Add to cart error:", error.message);
        }
    };

    const removeFromCart = async (productId, size) => {
        try {
            await axios.post(
                `${backendUrl}/api/cart/remove`,
                { productId, size },
                { headers: { token } }
            );

            setCartItems((prev) => {
                const updated = { ...prev };
                if (updated[productId][size] > 1) {
                    updated[productId][size] -= 1;
                } else {
                    delete updated[productId][size];
                }
                return updated;
            });

        } catch (error) {
            console.log("Remove cart error:", error.message);
        }
    };

    const getTotalCartItems = () => {
        let total = 0;
        for (let productId in cartItems) {
            for (let size in cartItems[productId]) {
                total += cartItems[productId][size];
            }
        }
        return total;
    };


     useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [token]);

  const value = {
    products,
    cartItems,
    token,
    setToken,
    fetchProducts,
    addToCart,
    removeFromCart,
    getTotalCartItems
  };
return (
    <ShopContext.Provider value={value}>
        {children}
    </ShopContext.Provider>
);
};
export default ShopContext;