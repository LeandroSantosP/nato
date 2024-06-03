import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Code, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorFormMessage from "./ErroFormMessage";
import { useMutation } from "react-query";
import { signUp } from "@/api/auth";
import { UserAlreadyExits } from "@/errors/AuthErros";
import { useState } from "react";
import { getCountry, getState } from "@/utils/get-user-location";

const SignUpFilterSchema = z.object({
  login: z
    .string()
    .min(5, "Required Field, must have at least 5 character(s)!")
    .transform((s) => {
      return s[0].toUpperCase() + s.slice(1, s.length);
    }),
  birthday: z.string().transform((arg) => new Date(arg)),
  email: z.string().email("Email format is not valid!"),
  password: z.string().min(10, "Password must be at least 10 character(s)!")
});

type SignUpFilterSchema = z.infer<typeof SignUpFilterSchema>;

export function SignUpForm() {
  const [open, setOpen] = useState(false);
  const country = getCountry();
  const state = getState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<SignUpFilterSchema>({
    resolver: zodResolver(SignUpFilterSchema)
  });

  const { mutateAsync: signUpFn } = useMutation({
    mutationFn: signUp,
    onError(erro: Error) {
      if (erro instanceof UserAlreadyExits) {
        setError("email", {
          message: erro.message
        });
      }
    }
  });

  async function handleSignUpForm(data: SignUpFilterSchema) {
    try {
      await signUpFn({ ...data, country, state });
      setOpen(false);
      reset();
    } catch (error) {
      return;
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-2 rounded bg-primary text-zinc-900 hover:text-zinc-100 shadow hover:bg-primary/90 border bg-emerald-500 text-sm font-medium w-full border-my-gray-01">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-my-gray-dark border border-my-gray-01">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Code /> Join Nato Right Now!
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleSignUpForm)}
          className="grid gap-4 py-4"
        >
          <div className="flex flex-col justify-center gap-2">
            <Label htmlFor="name">Login: </Label>
            <Input
              {...register("login")}
              id="name"
              placeholder="Pedro Duarte"
              className="col-span-3"
            />
            {errors.login?.message && (
              <ErrorFormMessage
                message={errors.login.message}
                className=" w-full"
              />
            )}
          </div>
          <div className="flex flex-col justify-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="johnDoe@gmail.com"
              className="col-span-3"
            />
            {errors.email?.message && (
              <ErrorFormMessage message={errors.email.message} />
            )}
          </div>
          <div className="flex flex-col justify-center gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              type="password"
              id="password"
              placeholder="******"
              className="col-span-3"
            />
            {errors.password?.message && (
              <ErrorFormMessage message={errors.password.message} />
            )}
          </div>
          <div className="flex flex-col justify-center gap-2">
            <Label htmlFor="birthday">BirthDay</Label>
            <Input
              {...register("birthday")}
              type="date"
              id="birthday"
              className="col-span-3"
            />
            {errors.birthday?.message && (
              <ErrorFormMessage message={errors.birthday.message} />
            )}
          </div>
          <div className="flex flex-col justify-center gap-2">
            <p className="flex text-center items-center gap-1">
              <MapPin className="text-sm" />
              <span className="text-sm italic text-gray-100 underline">
                {country}, {state}
              </span>
            </p>
          </div>
          <Button
            type="submit"
            className="hover:brightness-110 hover:bg-emerald-500/20"
          >
            Sing In
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
