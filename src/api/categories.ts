import { BASE_URL, delay } from "./profile";

export type GetCategoriesResponse = {
  id: string;
  name: string;
  videos: {
    id: string;
    title: string;
    type: string;
    authorId: string;
    thumbnailUrl: string;
    createdAt: Date;
  }[];
};

export const get_categories_by_name = ({ name }: { name: string }) => {
  return fetch(BASE_URL + "/categories?name=" + name, {
    cache: "no-cache"
  }).then<GetCategoriesResponse>(async (res) => {
    await delay(3000);
    let output = await res.json();
    return output[0];
  });
};

export const get_categories = () => {
  return fetch(BASE_URL + "/categories", {
    cache: "no-cache"
  }).then<GetCategoriesResponse[]>(async (res) => {
    await delay(3000);
    let output = await res.json();
    return output;
  });
};
