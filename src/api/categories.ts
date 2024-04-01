import { BASE_URL_J_SERVER, delay } from "./profile";

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

export const get_categories_by_name = ({
  category_name,
  video_title
}: {
  category_name?: string;
  video_title?: string;
}) => {
  return fetch(
    BASE_URL_J_SERVER + "/categories?name=" + (category_name ?? ""),
    {
      cache: "no-cache"
    }
  ).then<GetCategoriesResponse[]>(async (res) => {
    await delay(3000);
    let output: GetCategoriesResponse[] = await res.json();

    if (video_title && category_name) {
      let videoFiltered = [];
      for (let i = 0; i < output.length; i++) {
        for (let j = i; j < output[i].videos.length; j++) {
          if (
            !output[i].videos[j].title
              .toLocaleLowerCase()
              .includes(video_title.toLocaleLowerCase())
          ) {
            continue;
          }
          videoFiltered.push(output[i].videos[j]);
        }
      }
      output = output.map((res) => {
        res.videos = videoFiltered;
        return res;
      });
    }

    return output;
  });
};

export const get_categories = () => {
  return fetch(BASE_URL_J_SERVER + "/categories", {
    cache: "no-cache"
  }).then<GetCategoriesResponse[]>(async (res) => {
    await delay(3000);
    let output = await res.json();
    return output;
  });
};
