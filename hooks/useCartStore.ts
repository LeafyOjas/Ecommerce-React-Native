import { create } from 'zustand';

type Product = {
    id: string;
    title: string;
    price: number;
    image: string;
};

type CartItem = Product & {
    quantity: number;
};

type CartStore = {
    cart: Map<string, CartItem>;
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    getCartItems: () => CartItem[];
    getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
    cart: new Map(),

    addToCart: (product) => {
        const cart = new Map(get().cart);
        const existing = cart.get(product.id);

        if (existing) {
            cart.set(product.id, {
                ...existing,
                quantity: existing.quantity + 1,
            });
        } else {
            cart.set(product.id, {
                ...product,
                quantity: 1,
            });
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
}));
