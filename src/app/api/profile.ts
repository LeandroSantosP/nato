
const BASE_URL = "http://localhost:4000"

type ProfileResponse = Array<{
	id: string,
	username: string,
	avatarUrl: string,
	description: string
}>

export const get_profile  = (user_id: string) => fetch(BASE_URL+`/profile?id=${user_id}`,{
	cache: "no-cache"
}).then<ProfileResponse>(async res => {
	return await res.json();
});


export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}