import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load from local storage initially
    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }

        // In a real app we might want to sync with backend here if user is logged in
    }, []);

    // Save to local storage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = async (product, qty, size) => {
        const existItem = cartItems.find((x) => x.product === product._id && x.size === size);

        if (existItem) {
            setCartItems(
                cartItems.map((x) =>
                    x.product === existItem.product && x.size === size
                        ? { ...existItem, qty: Number(x.qty) + Number(qty) }
                        : x
                )
            );
        } else {
            setCartItems([...cartItems, {
                product: product._id,
                name: product.name,
                image: product.image || product.images[0],
                price: product.discountPrice || product.price,
                qty: Number(qty),
                size
            }]);
        }
        toast.success('Added to cart');

        // Attempt backend sync
        try {
            await axios.post('/api/cart', {
                cartItems: cartItems.map(item => ({ product: item.product, qty: item.qty, size: item.size }))
            });
        } catch (e) {
            // Not logged in or error, ignore for now
        }
    };

    const removeFromCart = (id, size) => {
        setCartItems(cartItems.filter((x) => !(x.product === id && x.size === size)));
        toast.success('Removed from cart');
    };

    const updateQty = (id, size, qty) => {
        setCartItems(
            cartItems.map((x) =>
                x.product === id && x.size === size
                    ? { ...x, qty: Number(qty) }
                    : x
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
