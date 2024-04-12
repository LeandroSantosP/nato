export const BASE_URL_J_SERVER = "http://localhost:4000";
export const BASE_URL = "http://localhost:4545";

/* Private */

export interface GetProfileOutput {
  id: number;
  login: string;
  email: string;
  roles: string[];
  profile: {
    username: string;
    bio: string;
    profileUrl: string;
    birthday: Date;
    address: {
      country: string;
      city: string;
    };
  };
  createdAt: Date;
  updated: Date;
}

export const get_profile_fake = (token: string = "1") =>
  fetch(BASE_URL_J_SERVER + `/profile?id=${1}`, {
    cache: "no-cache"
  }).then<GetProfileOutput>(async (res) => {
    let profiles = await res.json();
    return profiles[0];
  });

export const get_profile = async (token: string): Promise<GetProfileOutput> => {
  const response = await fetch(BASE_URL + "/user/private/", {
    cache: "no-cache",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  });
  if (!response.ok) {
    throw new Error("Error on get User!");
  }
  return response.json();
};

/* Public */

/* Utils */

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
