"use client"

import { usePathname } from "next/navigation";
import { AvatarFallback, AvatarImage, Avatar } from "./ui/avatar";
import Link from "next/link";
import { useCategoriesStore } from "@/providers/CategoriesStorageProvider";
import { useQuery } from "react-query";
import { get_categories } from "@/api/categories";
import { Button } from "./ui/button";

export default function Channels() {
  const { getCategoriesByName, categories } = useCategoriesStore((state) => state);
  const { data } = useQuery({
    queryKey: "category",
    queryFn: get_categories
  });

  const currentPage = usePathname()
  return (
    <section className="flex min-w-52 p-2 gap-2 flex-col h-full min-h-44 rounded-lg bg-zinc-950 border-my-gray-01 border">
      <header className="flex justify-between p-2 gap-2 text-xs px-3 items-center border-[1px] border-my-gray-01 mb-3 rounded">
        <h1 className="text-sm">Nato</h1>
        <div className="flex items-center gap-2">
          <p className="text-[0.7rem]">John doe</p>
          <Avatar className="size-7">
            <AvatarImage src={"https://i.imgur.com/eHJNhfo.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-col gap-2">
        <Link
          href="/contents"
          className="p-2 rounded bg-my-gray-light-two border  text-sm font-medium w-full border-my-gray-01"
        >
          Content
        </Link>
        <Link
          href="/stream"
          className="p-2 rounded bg-my-gray-light-two border text-sm font-medium w-full border-my-gray-01"
        >
          Stream
        </Link>
      </div>
      {currentPage == "/contents" && data && (
        <div className="flex flex-col gap-2">
          <h2 className={`font-bold border-b-[1px] border-zinc-700`}>
            Categories
          </h2>
          {
            data?.map(category => {
              return (
                <Button
                  onClick={() => getCategoriesByName(category.name)}
                  key={category.id}
                  className={`flex items-center ${categories[0]?.id == category.id && "bg-emerald-400 text-zinc-900 hover:text-zinc-100"} p-2 rounded border border-my-gray-01 transition-all hover:cursor-pointer hover:bg-zinc-900`}
                >
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </Button>
              )
            })
          }
        </div >
      )
      }
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
