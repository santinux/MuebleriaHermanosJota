// src/context/AppContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { login as loginService, getProfile } from "../services/authService";

const STORAGE_KEY = "reactShoppingCart";
const AUTH_STORAGE_KEY = "reactAuthUser";
const TOKEN_STORAGE_KEY = "reactAuthToken";
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
            const token = localStorage.getItem(TOKEN_STORAGE_KEY);
            if (saved && token) {
                return JSON.parse(saved);
            }
            return null;
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        if (typeof window === "undefined") return null;
        try {
            const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
            if (savedToken) {
                // Limpiar el token al cargarlo
                return savedToken.toString().trim().replace(/^["']|["']$/g, '');
            }
            return null;
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

    // Guardar usuario y token cuando cambien
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (user && token) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
            // Asegurarse de que el token se guarde sin comillas
            const cleanToken = token.toString().trim().replace(/^["']|["']$/g, '');
            localStorage.setItem(TOKEN_STORAGE_KEY, cleanToken);
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
    }, [user, token]);

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
    const login = async (credentials) => {
        try {
            setLoading(true);
            const response = await loginService(credentials);
            if (response.success && response.data) {
                setUser(response.data.user);
                // Limpiar el token antes de guardarlo
                const cleanToken = response.data.token ? response.data.token.toString().trim().replace(/^["']|["']$/g, '') : null;
                setToken(cleanToken);
                return { success: true, message: response.message };
            }
            throw new Error(response.message || 'Error al iniciar sesión');
        } catch (error) {
            console.error('Error en login:', error);
            return { success: false, message: error.message || 'Error al iniciar sesión' };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            const { register: registerService } = await import('../services/authService');
            const response = await registerService(userData);
            if (response.success && response.data) {
                setUser(response.data.user);
                // Limpiar el token antes de guardarlo
                const cleanToken = response.data.token ? response.data.token.toString().trim().replace(/^["']|["']$/g, '') : null;
                setToken(cleanToken);
                return { success: true, message: response.message };
            }
            throw new Error(response.message || 'Error al registrar usuario');
        } catch (error) {
            console.error('Error en registro:', error);
            return { success: false, message: error.message || 'Error al registrar usuario' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setCurrentPage("home");
    };

    const isAuthenticated = !!user && !!token;
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
        token,
        login,
        register,
        logout,
        isAuthenticated,
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
