import React, { useState, createContext, useEffect } from "react";
import { food_list } from "../assets/frontend_assets/assets"; // Importing static food list

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const url = "https://vignan-mhp.onrender.com";

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);

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

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, item) => {
            const itemInfo = food_list.find((product) => product._id === item);
            return total + (itemInfo ? itemInfo.price * cartItems[item] : 0);
        }, 0);
    };

    const contextValue = {
        food_list,  // Providing static food list
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
