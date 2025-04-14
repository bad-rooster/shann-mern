import {create} from "zustand";

export const useCounterStore = create((set) => (
    {input_str: [],
    update: (input_str) => {
        set(() => ({input_str: [input_str]}))
        console.log(input_str);
    }
    }
))