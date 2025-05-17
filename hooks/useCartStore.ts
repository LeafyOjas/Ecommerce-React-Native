import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

type CartItem = Product & {
    quantity: number;
};

type CartStore = {
    cart: Map<number, CartItem>;
    addToCart: (product: Product) => void;
    decrementToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    getCartItems: () => CartItem[];
    getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: new Map(),

            addToCart: (product) => {
                const cart = new Map(get().cart);
                const existing = cart.get(product.id);

                cart.set(product.id, {
                    ...product,
                    quantity: existing ? existing.quantity + 1 : 1,
                });

                set({ cart });
            },

            decrementToCart: (id) => {
                const cart = new Map(get().cart);
                const existing = cart.get(id);
                if (!existing) return;

                if (existing.quantity === 1) {
                    cart.delete(id);
                } else {
                    cart.set(id, { ...existing, quantity: existing.quantity - 1 });
                }

                set({ cart });
            },

            removeFromCart: (id) => {
                const cart = new Map(get().cart);
                cart.delete(id);
                set({ cart });
            },

            clearCart: () => set({ cart: new Map() }),

            getCartItems: () => Array.from(get().cart.values()),

            getTotalPrice: () =>
                Array.from(get().cart.values()).reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                ),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                cart: Array.from(state.cart.entries()),
            }),
            merge: (persistedState, currentState) => {
                const cartArray = (persistedState as any).cart || [];
                const cart = new Map<number, CartItem>(cartArray as [number, CartItem][]);
                return { ...currentState, cart };
            },
        }
    )
);
