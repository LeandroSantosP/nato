'use client'
import { CategoriesStore, createCategoriesStorage, initialStateCategories } from "@/stores/CategoriesStorage"
import { createContext, ReactNode, useContext, useRef } from "react"
import { useStore, type StoreApi } from "zustand"


export interface CategoriesStorageProviderProps {
	children: ReactNode
}

export const CategoriesStoreContext = createContext<StoreApi<CategoriesStore> | null>(
	null,
)

export const CategoriesStorageProvider = ({ children }: CategoriesStorageProviderProps) => {
	const storeRef = useRef<StoreApi<CategoriesStore>>();
	if (!storeRef.current) {
		storeRef.current = createCategoriesStorage(initialStateCategories);
	}
	return (
		<CategoriesStoreContext.Provider value={storeRef.current}>
			{children}
		</CategoriesStoreContext.Provider>
	)
}

export const useCategoriesStore = <T,>(selector: (store: CategoriesStore) => T,) => {
	const categoriesStoreContext = useContext(CategoriesStoreContext)
	if (!categoriesStoreContext) {
		throw new Error(`useCategoriesStore must be use within CategoriesStoreProvider`)
	}
	return useStore(categoriesStoreContext, selector)
}