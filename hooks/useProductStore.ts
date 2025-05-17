import { create } from 'zustand'

type Product = {
    id: string
    title: string
    description: string
    category: string
    image: string
    price: number
    rating: {
        rate: number,
        count: number
    }
}

type ProductStore = {

    products: any,
    setAllProducts: (products: Product[]) => void
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: new Map(),

    setAllProducts: (products) => {
        const newProducts = new Map();

        products.forEach(element => {
            newProducts.set(element.id, element)
        });
        set({
            products: newProducts,
        })
    }
}))
