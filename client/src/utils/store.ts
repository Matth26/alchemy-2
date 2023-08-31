import { create } from 'zustand';

interface ElementState {
  element_ids: number[];
  add_element: (id: number) => void;
}

export const useElementStore = create<ElementState>((set) => ({
  element_ids: [],
  add_element: (id: number) =>
    set((state) => ({ element_ids: [...state.element_ids, id] })),
}));
