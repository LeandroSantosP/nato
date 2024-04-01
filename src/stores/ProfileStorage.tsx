import { get_profile, UserProfile } from "@/api/profile";
import { createStore } from "zustand";

export type ProfileActions = {
	getProfileById: (id: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>
	LogIn: (email: string, password: string) => Promise<{ token: string }>
	signOut: (data: { email: string, password: string, username: string }) => Promise<void>
};


export type ProfileState = {
	profileData: UserProfile | null
};

export const initialStateProfile: ProfileState = {
	profileData: null
};

export type ProfileStore = ProfileState & ProfileActions;

export const createProfileStorage = (state: ProfileState) => {
	return createStore<ProfileStore>((set, get) => ({
		...state,
		async signIn(email, password) {
		},
		async getProfileById(id) {
			console.log("test1");
			const profileData = await get_profile(id);
			console.log("CURENT:" + profileData);
			set((state) => ({ profileData }))
		},
		async LogIn(email, password) {
			return {
				token: ""
			}
		},
		async signOut(data) {

		},
		profileData: null,
	}))
}