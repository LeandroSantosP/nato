"use client";
import { get_categories, get_categories_by_name } from "@/api/categories";
import { FilterCategoriesForm } from "@/components/FilterCategoriesForm";
import SkeletonLoadCategories from "@/components/skeletons/SkeletonLoadCategories";
import { VideoCard } from "@/components/VideoCard";
import { PlayIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

export default function Contents() {
  const searchParams = useSearchParams();
  const category_name = searchParams.get("category_name");
  const video_title = searchParams.get("video_title");
  const { data, isLoading } = useQuery({
    queryKey: ["category", category_name, video_title],
    queryFn: () =>
      category_name != null
        ? get_categories_by_name({
            category_name,
            video_title: video_title ?? ""
          })
        : get_categories()
  });
  return (
    <main className="space-y-0.5 gap-2 p-2 w-full flex flex-col h-screen">
      <FilterCategoriesForm />
      {isLoading ? (
        <SkeletonLoadCategories />
      ) : (
        <section className="flex overflow-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-zinc-800 h-full flex-col gap-10 p-3">
          {data?.map((category) => {
            return (
              <div key={category.id} className="flex flex-col ">
                <div className="flex gap-2 font-extrabold">
                  <PlayIcon className="fill-emerald-600 text-emerald-600" />
                  <h1>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </h1>
                </div>
                <div className="flex w-full flex-wrap h-full gap-3 my-6">
                  {category.videos.map((video) => (
                    <VideoCard key={video.id} {...video} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}
