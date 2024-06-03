import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useQuery } from "react-query";
import { getCookie } from "@/utils/cookies";
import { get_profile } from "@/api/profile";
import { use } from "react";

export default function EditProfileForm() {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:bg-zinc-100/10 absolute right-10 border border-l-zinc-700 text-zinc-300 px-3 py-1 rounded-lg">
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="bg-my-gray-dark border border-my-gray-01">
        <form className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-5">
            <DialogTitle>Edit Profile!</DialogTitle>
            <Button
              disabled={isLoading}
              type="submit"
              className="hover:brightness-110 hover:bg-emerald-500/20"
            >
              Save
            </Button>
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              disabled={isLoading}
              type="username"
              id="username"
              defaultValue={user?.profile.username}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="birthday">BirthDay</Label>
            <Input
              type="date"
              id="birthday"
              defaultValue={user?.profile.birthday.toString() || ""}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="password">Bio</Label>
            <Textarea id="bio" defaultValue={user?.profile.bio} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
