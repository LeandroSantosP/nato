"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AvatarFallback, AvatarImage, Avatar } from "./ui/avatar";
import Link from "next/link";
import { useQuery } from "react-query";
import { get_categories_by_name } from "@/api/categories";
import { Button } from "./ui/button";
import { LogInForm } from "./LogInForm";
import { SignUpForm } from "./SignUpForm";
import { get_profile_fake } from "@/api/profile";
import { getCookie } from "@/utils/cookies";
import SkeletonLoadingProfileHeader from "./skeletons/SkeletonLoadingProfileHeader";

export default function Channels() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const token = getCookie("token");

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", token],
    queryFn: () => {
      if (!token) {
        return
      }
      return get_profile_fake(token)
    }
  });

  const { data: categories } = useQuery({
    queryKey: "category",
    queryFn: () => get_categories_by_name({})
  });

  function setSearchCategoryOnUrl(value: string) {

    const params = new URLSearchParams(searchParams);
    const current = params.get("category_name");

    params.delete("video_title")
    if (value) {
      params.set("category_name", value)
    } else {
      params.delete("category_name")
    }
    if (current == value) {
      params.delete("category_name", value);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const currentPage = usePathname();
  const isLogged = false;
  return (
    <section className="flex min-w-52 p-2 gap-2 flex-col h-full min-h-44 rounded-lg bg-zinc-950 border-my-gray-01 border">

      {isLoading ? <SkeletonLoadingProfileHeader /> : profile ? (
        <header className="flex justify-between p-2 gap-2 text-xs px-3 items-center border-[1px] border-my-gray-01 mb-3 rounded">
          <h1 className="text-sm">Nato</h1>
          <div className="flex items-center gap-2">
            <p className="text-[0.7rem]">{profile.username}</p>
            <Avatar className="size-7">
              <AvatarImage src={profile.avatarUrls[0]} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>
      ) : (
        <header className="flex flex-col justify-between p-2 gap-2 text-xs px-3 items-center border-[1px] border-my-gray-01 mb-3 rounded">
          <LogInForm />
          <SignUpForm />
        </header>
      )}
      <div className="flex flex-col gap-2">
        {isLogged && (
          <Link
            href="/contents"
            className="p-2 rounded bg-primary text-zinc-100 shadow hover:bg-primary/90 border  text-sm font-medium w-full border-my-gray-01"
          >
            Content
          </Link>
        )}
        <Link
          href="/live"
          className={`p-2 rounded bg-primary text-zinc-100 shadow hover:bg-primary/90 border text-sm font-medium w-full border-my-gray-01`}
        >
          Live
        </Link>
      </div>
      {currentPage == "/contents" && (
        <div className="flex flex-col gap-2">
          <h2 className={`font-bold border-b-[1px] border-zinc-700`}>
            Categories
          </h2>
          {
            categories?.map(category => {
              return (
                <Button
                  onClick={() => setSearchCategoryOnUrl(category.name)}
                  key={category.id}
                  className={`flex items-center ${searchParams.get("category_name") == category.name && "bg-emerald-400 text-zinc-900 hover:text-zinc-100"} p-2 rounded border border-my-gray-01 transition-all hover:cursor-pointer hover:bg-zinc-900`}
                >
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </Button>
              )
            })
          }
        </div >
      )}
      <div className="flex flex-col w-full gap-2 scrollbar overflow-auto scrollbar-none">
        <h2 className="font-bold border-b-[1px] border-zinc-700">
          Following
        </h2>
        {Array.from({ length: 10 }).map((s, i) => {
          return (
            <div
              className="flex items-center p-2 gap-2 rounded border border-my-gray-01 hover:bg-zinc-900 transition-all hover:cursor-pointer"
              key={i}
            >
              <Avatar className="size-6">
                <AvatarImage src={"https://i.imgur.com/eHJNhfo.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col grow">
                <span className="text-[0.6rem]">John Doe</span>
                <span className="text-xs">Program</span>
              </div>
              <div className="h-2 w-2 bg-red-600 rounded-full" />
              {/* <ViewsAmount content="100" variant="primary" btSize={20} /> */}
            </div>
          );
        })}
      </div>
    </section >
  );
}
