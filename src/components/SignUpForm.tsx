import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorFormMessage from "./ErroFormMessage";
import { useMutation } from "react-query";
import { signUp } from "@/api/auth";
import { UserAlreadyExits } from "@/errors/AuthErros";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./ui/tooltip";

const SignUpFilterSchema = z.object({
  email: z.string().email("Email format is not valid!"),
  username: z
    .string()
    .min(5, "Required Field, must have at least 5 character(s)!"),
  name: z
    .string()
    .min(5, "Required Field, must have at least 5 character(s)!")
    .transform((s) => {
      return s[0].toUpperCase() + s.slice(1, s.length);
    }),
  password: z.string().min(10, "Password must be at least 10 character(s)!")
});

type SignUpFilterSchema = z.infer<typeof SignUpFilterSchema>;

export function SignUpForm() {
  const [open, setOpen] = useState(false);
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
      await signUpFn({ ...data });
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
            <Label htmlFor="name">Name: </Label>
            <Input
              {...register("name")}
              id="name"
              placeholder="Pedro Duarte"
              className="col-span-3"
            />
            {errors.name?.message && (
              <ErrorFormMessage
                message={errors.name.message}
                className=" w-full"
              />
            )}
          </div>
          <div className="flex flex-col justify-center gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register("username")}
              id="username"
              placeholder="Pedro_Duarte123"
              className="col-span-3"
            />
            {errors.username?.message && (
              <ErrorFormMessage message={errors.username.message} />
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
