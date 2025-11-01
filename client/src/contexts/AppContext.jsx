// src/context/AppContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "reactShoppingCart";
const AUTH_STORAGE_KEY = "reactAuthUser";
const AppContext = createContext(null);

const getId = (p) => p?.id ?? p?._id;

export default function AppProvider({ children }) {
    // Estado de navegación
    const [currentPage, setCurrentPage] = useState("home");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Estado de autenticación
    const [user, setUser] = useState(() => {
        if (typeof window === "undefined") return null;
        try {
            const saved = localStorage.getItem(AUTH_STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    // Carrito
    const [cart, setCart] = useState(() => {
        if (typeof window === "undefined") return [];
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            const parsed = saved ? JSON.parse(saved) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    });

    // Guardar carrito cuando cambie
    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    // Guardar usuario cuando cambie
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (user) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    }, [user]);

    // Acciones carrito
    const addToCart = (product, qty = 1) => {
        const pid = getId(product);
        if (!pid) return;
        setCart((prev) => {
            const ix = prev.findIndex((i) => getId(i) === pid);
            if (ix >= 0) {
                const next = [...prev];
                next[ix] = { ...next[ix], quantity: next[ix].quantity + qty };
                return next;
            }
            return [...prev, { ...product, id: pid, quantity: Math.max(1, qty) }];
        });
    };

    const setItemQty = (productId, qty) => {
        setCart((prev) =>
            prev
                .map((i) =>
                    getId(i) === productId ? { ...i, quantity: Math.max(0, qty) } : i
                )
                .filter((i) => i.quantity > 0)
        );
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((i) => getId(i) !== productId));
    };

    const updateCart = (updatedCart) => setCart(updatedCart);
    const clearCart = () => setCart([]);

    // Navegación detalle
    const exitProductDetail = (nextPage) => {
        setSelectedProduct(null);
        if (nextPage) setCurrentPage(nextPage);
    };

    // Derivados
    const cartCount = useMemo(
        () => cart.reduce((sum, i) => sum + (i.quantity || 0), 0),
        [cart]
    );

    const cartTotal = useMemo(
        () =>
            cart.reduce(
                (sum, i) =>
                    sum + Number(i.precio ?? i.price ?? 0) * Number(i.quantity || 0),
                0
            ),
        [cart]
    );

    // Funciones de autenticación
    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        setCurrentPage("home");
    };

    const isAdmin = user?.role === "admin";
    const isClient = user?.role === "client";

    const value = {
        // Página
        currentPage,
        setCurrentPage,
        selectedProduct,
        setSelectedProduct,
        exitProductDetail,
        // Carrito
        cart,
        addToCart,
        setItemQty,
        removeFromCart,
        updateCart,
        clearCart,
        cartCount,
        cartTotal,

        // Estado general
        loading,
        setLoading,
        error,
        setError,

        // Autenticación
        user,
        login,
        logout,
        isAdmin,
        isClient,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppContext debe usarse dentro de <AppProvider>");
    return ctx;
}
