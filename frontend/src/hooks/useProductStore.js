import {create} from "zustand";

export const useProductStore = create((set) => (
    {input_str: [],
    update: (input_str) => {
        set(() => ({input_str: input_str}))
        console.log(input_str);
    }
    }
))

export const useProductId = create((set) => (
    {productId: "",
    fetchProductId: (productId) => {
    set(() => ({productId: productId}))
        console.log(productId);}
    }
))