export const BASE_URL = "http://localhost:4000";

type ProfileResponse = {
  id: string;
  username: string;
  avatarUrl: string;
  description: string;
};

/* Private */

export const get_profile = (user_id: string) =>
  fetch(BASE_URL + `/profile?id=${user_id}`, {
    cache: "no-cache"
  }).then<ProfileResponse>(async (res) => {
    await delay(10000);
    let profiles = await res.json();
    return profiles[0];
  });

/* Public */

/* Utils */

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
