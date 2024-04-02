import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Facebook,
  Instagram,
  MapPin,
  Plus,
  Twitter,
  Youtube
} from "lucide-react";

export default function Profile() {
  return (
    <div className="flex flex-col bg-my-gray-light-two/20 rounded-lg w-full m-5">
      <div className="flex p-5 border border-my-gray-01  justify-center max-h-72 h-full gap-5 px-10">
        <Avatar className="size-40 ">
          <AvatarImage src={"https://i.imgur.com/yDG1S2F.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2 w-full ">
          <div className="flex flex-col gap-1 flex-1 mt-5">
            <h1 className="text-2xl font-bold">John Doe!</h1>
            <span className="flex gap-3">
              <div className="flex ">
                <MapPin /> <p className="text-zinc-50">Brazil</p>
              </div>
              <p className="font-thin text-zinc-500">Sr. Web Developer</p>
            </span>
          </div>
          <div className="flex bg-my-gray-light-one border border-my-gray-01 rounded-lg  min-h-20 items-center  min-w-32">
            <Button className="w-full rounded-none border border-my-gray-01 h-full">
              Following
            </Button>
            <Button className="w-full rounded-none border border-my-gray-01 h-full">
              Followers
            </Button>
            <Button className="w-full min-w-80 rounded-none border border-my-gray-01 h-full gap-1">
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
      <div className="flex justify-center h-full gap-5 px-10 py-2">
        <div>
          <h1 className="text-lg font-bold">About John Doe!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            eum nihil,
          </p>
          <p>
            nobis harum eaque obcaecati, cupiditate hic incidunt qui consequatur
            reiciendis beatae soluta quos dolor iusto nam veniam atque?
            Architecto!
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex flex-col h-full p-2 min-w-72 border border-my-gray-01">
              <h2>Username:</h2>
              <Input disabled value={"joe Doe"} className="text-white" />
              <h2>Email:</h2>
              <Input
                disabled
                value={"joeDoe@gmail.com"}
                className="text-white"
              />
              <h2>Bio:</h2>
              <textarea
                disabled
                value={"joeDoe@gmail.com"}
                className="text-white h-full"
              />
            </div>
          </DialogTrigger>
          <DialogContent>oi</DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
