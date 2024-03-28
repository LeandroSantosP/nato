import {
  get_categories,
  get_categories_by_name,
  GetCategoriesResponse
} from "@/api/categories";
import { createStore } from "zustand/vanilla";

export type CategoriesActions = {
  getCategories: () => Promise<void>;
  getCategoriesByName: (name: string) => Promise<void>;
};

export type CategoriesState = {
  categories: GetCategoriesResponse[];
  isLoading: boolean;
};

export const initialStateCategories: CategoriesState = {
  categories: [],
  isLoading: false
};

export type CategoriesStore = CategoriesState & CategoriesActions;

export const createCategoriesStorage = (
  state: CategoriesState = initialStateCategories
) => {
  return createStore<CategoriesStore>((set, get) => ({
    ...state,
    getCategories: async () => {
      set(() => ({ isLoading: true }));
      let categories = await get_categories();
      set(() => ({ categories }));
      set(() => ({ isLoading: false }));
    },
    getCategoriesByName: async (name) => {
      const { categories: current, getCategories } = get();
      if (current.length == 1 && name == current[0].name) {
        getCategories();
        return;
      }
      set(() => ({ isLoading: true }));
      let categories = await get_categories_by_name({ category_name: name });
      set(() => ({ categories: categories }));
      set(() => ({ isLoading: false }));
    }
  }));
};
