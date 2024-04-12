"use client";

import { get_profile_fake } from "@/api/profile";
import { getCookie } from "@/utils/cookies";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import { twMerge } from "tailwind-merge";

interface VideoCardProps {
  id: string;
  title: string;
  type: string;
  authorId: string;
  thumbnailUrl: string;
  createdAt: Date;
}
export function VideoCard({
  createdAt,
  id,
  thumbnailUrl,
  title,
  type
}: VideoCardProps) {
  const token = getCookie("token");
  const { data: profile } = useQuery({
    queryKey: ["profile", token],
    queryFn: () => {
      if (!token) {
        return;
      }
      return get_profile_fake(token);
    }
  });
  const isSubs = true;
  const isPaid = type === "paid";
  const ContentNotAvailable = (!profile && isPaid) || (profile && !isSubs);
  return (
    <Link
      key={id}
      href={`/contents/${id}`}
      className={twMerge(
        "flex hover:scale-105 hover:brightness-110 transition-transform flex-col gap-2 p-2 rounded-xl border border-my-gray-01 w-[259px]",
        isPaid ? "bg-emerald-500/10" : "bg-rose-500/10",
        ContentNotAvailable && "pointer-events-none bg-my-gray-light-one/10"
      )}
    >
      <Image
        src={thumbnailUrl}
        height={10}
        width={10}
        quality={80}
        alt={title}
        className={`w-full max-w-[300px] h-full rounded ${ContentNotAvailable && "opacity-30"}`}
      />
      <h1
        className={`${ContentNotAvailable ? "text-gray-300/50" : "text-gray-300"}  font-semibold text-sm`}
      >
        {title}
      </h1>
      <div
        className={`${ContentNotAvailable ? "text-gray-300/50" : "text-gray-300"} flex gap-2`}
      >
        {(3000).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </Link>
  );
}
