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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
];

const UpdateProfileSchema = z.object({
  username: z
    .string()
    .min(5, "Required Field, must have at least 5 character(s)!")
    .transform((s) => {
      return s[0].toUpperCase() + s.slice(1, s.length);
    }),
  avatar: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  bio: z
    .string()
    .max(
      200,
      "Required Field, this field must not be longer than 200 characters!"
    )
    .transform((s) => {
      return s[0].toUpperCase() + s.slice(1, s.length);
    }),
  birthday: z.string().transform((arg) => new Date(arg))
});
type UpdateProfileSchema = z.infer<typeof UpdateProfileSchema>;
export default function EditProfileForm() {
  const { register, handleSubmit, reset } = useForm<UpdateProfileSchema>({});

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
  const [preview, setPreview] = useState(user?.profile.userPictures[0]);

  const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const urlImage = URL.createObjectURL(file);
      setPreview(urlImage);
    }
  };

  async function handleUploadProfile(data: UpdateProfileSchema) {
    const s = data.avatar as FileList;
    console.log(s[0].name);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:bg-zinc-100/10 absolute right-10 border border-l-zinc-700 text-zinc-300 px-3 py-1 rounded-lg">
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="bg-my-gray-dark border border-my-gray-01">
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handleUploadProfile)}
        >
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

          <div className="flex items-center gap-4 justify-center">
            <Avatar className="size-16">
              <AvatarImage src={preview} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <input
              {...register("avatar")}
              onChange={handleUploadedFile}
              id="avatar"
              type="file"
              className="block w-full text-sm text-zinc-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-emerald-500
        hover:file:bg-violet-100
      "
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register("username")}
              disabled={isLoading}
              id="username"
              defaultValue={user?.profile.username}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="birthday">BirthDay</Label>
            <Input
              {...register("birthday")}
              type="date"
              id="birthday"
              defaultValue={user?.profile.birthday.toString() || ""}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="password">Bio</Label>
            <Textarea
              {...register("bio")}
              id="bio"
              defaultValue={user?.profile.bio}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
