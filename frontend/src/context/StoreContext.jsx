import React, { useState, createContext, useEffect } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [searchText, setSearchText] = useState("");
    const url = "https://vignanidp-backend.onrender.com";

    // Load cart from localStorage on init
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
        
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);

    // Save cart to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            if (!prev[itemId]) return prev;
            const newCart = { ...prev, [itemId]: prev[itemId] - 1 };
            if (newCart[itemId] <= 0) delete newCart[itemId];
            return newCart;
        });
    };

    // Add clearCart function to empty the cart
    const clearCart = () => {
        setCartItems({});
        // Also clear from localStorage for consistency
        localStorage.setItem("cart", JSON.stringify({}));
        console.log("Cart cleared successfully");
    };

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const itemInfo = food_list.find((product) => product._id === itemId);
            return total + (itemInfo ? itemInfo.price * cartItems[itemId] : 0);
        }, 0);
    };

    // For debugging
    const logCart = () => {
        console.log("Current cart items:", cartItems);
        console.log("Food list IDs:", food_list.map(item => item._id));
    };

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart, // Add the clearCart function to context
        getTotalCartAmount,
        url,
        token,
        setToken,
        searchText,
        setSearchText,
        logCart, // Add this for debugging
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
