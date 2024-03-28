'use client'

import { initialStateProfile, ProfileStore, createProfileStorage } from "@/stores/ProfileStorage"
import { createContext, ReactNode, useContext, useRef } from "react"
import { useStore, type StoreApi } from "zustand"


export interface ProfileStorageProviderProps {
	children: ReactNode
}

export const ProfileStoreContext = createContext<StoreApi<ProfileStore> | null>(
	null,
)

export const ProfileStorageProvider = ({ children }: ProfileStorageProviderProps) => {
	const storeRef = useRef<StoreApi<ProfileStore>>();
	if (!storeRef.current) {
		storeRef.current = createProfileStorage(initialStateProfile);
	}
	return (
		<ProfileStoreContext.Provider value={storeRef.current}>
			{children}
		</ProfileStoreContext.Provider>
	)
}

export const useProfileStore = <T,>(selector: (store: ProfileStore) => T,) => {
	const profileStoreContext = useContext(ProfileStoreContext)
	if (!profileStoreContext) {
		throw new Error(`useProfileStore must be use within profileStoreProvider`)
	}
	return useStore(profileStoreContext, selector)
}