"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPin,
  Plus,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Gift,
  CalendarDays,
  Crown
} from "lucide-react";
import { useQuery } from "react-query";
import { get_profile } from "@/api/profile";
import { getCookie } from "@/utils/cookies";
import ProfileScreenLoad from "@/components/skeletons/ProfileScreenLoad";
import EditProfileForm from "@/components/EditProfileForm";
import dayJs from "dayjs";
import "dayjs/locale/pt-br";

dayJs.locale("pt-br");

export default function Profile(props: { params: { login: string } }) {
  const token = getCookie("token");
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      if (!token) {
        return;
      }
      return get_profile(token);
    }
  });
  const profile = user?.profile;

  // => send user_login => if profile is mine based on token show the edit button.
  return (
    <div className="flex bg-zinc-900 rounded-lg m-5 w-full">
      {isLoading && !user ? (
        <ProfileScreenLoad />
      ) : (
        <>
          <div className="flex w-[80%] items-center justify-center flex-col">
            <div className="flex relative p-5 border border-my-gray-01 justify-center max-h-72 h-full gap-5 px-10">
              <EditProfileForm />
              <Avatar className="size-40 ">
                <AvatarImage src={profile?.profileUrl} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 w-full ">
                <div className="flex text-[12px] flex-col gap-1 flex-1 mt-5">
                  <div>
                    <h1 className="flex items-center text-2xl font-bold gap-2">
                      {profile?.username}!{" "}
                      <Crown className="fill-yellow-500 text-yellow-500" />
                    </h1>
                    <span className="font-thin text-zinc-400 ml-0.5">
                      @{user?.login}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-thin text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4 text-white" />
                      <p>
                        {profile?.address.country} {profile?.address.city}
                      </p>
                    </span>
                    <span className="flex items-center">
                      <p>Sr. Web Developer</p>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Gift className="size-4 text-white" />
                      Born {dayJs(profile?.birthday).format("MMMM DD, YYYY")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-4 text-white" />
                      Joined {dayJs(user?.createdAt).format("MMMM YYYY")}
                    </span>
                  </div>
                </div>
                <div className="flex bg-my-gray-light-one border border-my-gray-01 rounded-lg  min-h-20 items-center">
                  <Button className="w-full rounded-none border border-my-gray-01 h-full">
                    Following {"1233"}
                  </Button>
                  <Button className="w-full rounded-none border border-my-gray-01 h-full">
                    Followers
                  </Button>
                  <Button className="w-full rounded-none border border-my-gray-01 h-full gap-1">
                    Follow <Plus />
                  </Button>
                  <div className="flex w-full p-3 gap-2 justify-center">
                    <Facebook className="size-7" />
                    <Twitter className="size-7" />
                    <Youtube className="size-7" />
                    <Instagram className="size-7" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full gap-5 px-10">
              <div className="flex flex-col rounded mt-5 gap-2 p-2 h-52">
                <h1 className="text-xl font-bold">About</h1>
                <p className="text-lg">{profile?.bio}</p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col h-full p-2 border border-my-gray-01">
            Coming Soon...
          </div>
        </>
      )}
    </div>
  );
}
