"use client";

import Image from "next/image";
import { get_profile, get_profile_fake } from "../api/profile";
import VideoNav from "./VideoNav";
import ViewsAmount from "./ViewsAmount";
import FollowButton from "./FollowButton";
import { useQuery } from "react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SkeletonVideoDesc from "./skeletons/SkeletonVideoDesc";
import { getCookie } from "@/utils/cookies";

export default function VideoDesc() {
  const token = getCookie("token");
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", token],
    queryFn: () => {
      if (!token) {
        return;
      }
      return get_profile_fake(token);
    }
  });

  if (isLoading) {
    return <SkeletonVideoDesc />;
  }

  if (!profile) {
    return;
  }
  return (
    <div className="flex relative flex-col p-4 gap-2">
      <section className="flex items-center justify-between">
        <div className="flex flex-col  max-w-[24rem] space-y-1">
          <h3 className="text-[1.1rem] font-bold">
            Introduction to Python Programming.....
          </h3>
          <div className="flex items-center gap-2 rounded">
            <Avatar>
              <AvatarImage src={profile.avatarUrls[0]} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-[16px]">{profile.username}</p>
            <p className="font-thin text-zinc-500">Sr. Web Developer</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <FollowButton />
          <ViewsAmount btSize={30} />
        </div>
      </section>
      <VideoNav home={{ description: profile.description }} />
    </div>
  );
}
