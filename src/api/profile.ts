import e from "express";
import { use } from "react";

export const BASE_URL_J_SERVER = "http://localhost:4000";
export const BASE_URL = "http://localhost:4545";

/* Private */

interface GetUserIn {
  id: string;
  login: string;
  email: string;
  password: string;
  roles: string[];
}

interface GetProfileIn {
  profile: {
    userId: string;
    username: string;
    bio?: string;
    bannerUrl?: string;
    userPictures: string[];
    birthday: Date;
    country: string;
    city: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

type ProfileOutput = GetUserIn & GetProfileIn;

export const get_profile_fake = (token: string = "1") =>
  fetch(BASE_URL_J_SERVER + `/profile?id=${1}`, {
    cache: "no-cache"
  }).then<ProfileOutput>(async (res) => {
    let profiles = await res.json();
    return profiles[0];
  });

export const get_profile = async (token: string): Promise<ProfileOutput> => {
  try {
    const responseUserData = await fetch(BASE_URL + "/user/private/", {
      cache: "no-cache",
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    const responseProfileData = await fetch(BASE_URL + "/profile/private/", {
      cache: "no-cache",
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const userData = await responseUserData.json();
    const profileData = await responseProfileData.json();

    return { ...userData, profile: { ...profileData } };
  } catch (error) {
    console.log("HERE: " + error);
    throw new Error("Error on get User!");
  }
};

/* Public */

/* Utils */

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
