import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Code } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { signInFake } from "@/api/auth";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/cookies";
import ErrorFormMessage from "./ErroFormMessage";
import { useQueryClient } from "react-query";

const signInFilterSchema = z.object({
  email: z.string().email("Email format is not valid!"),
  password: z.string().min(10, "Password must be at least 10 character(s)!")
});

type SigInFilterSchema = z.infer<typeof signInFilterSchema>;

export function LogInForm() {
  const useQuery = useQueryClient();
  const { refresh } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SigInFilterSchema>({
    resolver: zodResolver(signInFilterSchema)
  });
  const { isLoading, mutateAsync: signInFn } = useMutation({
    mutationFn: signInFake,
    onSuccess(data, variables, context) {
      useQuery.invalidateQueries("profile");
    }
  });

  async function handleLoginForm({ email, password }: SigInFilterSchema) {
    try {
      const { token } = await signInFn({ email, password });
      setCookie("token", token, 10);
      alert("You logged with success!");
      refresh();
    } catch (error) {
      alert("Erro on sign-in!");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2 rounded bg-primary text-zinc-100 shadow hover:bg-primary/90 border  text-sm font-medium w-full border-my-gray-01">
          Log In
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-my-gray-dark border border-my-gray-01">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Code /> Iniciar sessão na Twitch Start Section on Nato!
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleLoginForm)}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className={`text-right `}>
              Email
            </Label>
            <Input
              {...register("email")}
              disabled={isLoading}
              id="email"
              placeholder="peduarte@gmail.com"
              className={`col-span-3 ${errors.email?.message && "text-red-300 border-red-200"}`}
            />
          </div>
          {errors.email?.message && (
            <ErrorFormMessage message={errors.email.message} />
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="password"
              className={`text-right ${errors.password?.message && "text-yellow-200"}`}
            >
              Password
            </Label>
            <Input
              {...register("password")}
              disabled={isLoading}
              type="password"
              id="password"
              placeholder="*****"
              className={`col-span-3 ${errors.password?.message && "text-yellow-300 border-yellow-200"}`}
            />
          </div>
          {errors.password?.message && (
            <ErrorFormMessage
              variant="active"
              message={errors.password.message}
            />
          )}
          <DialogFooter>
            <Button
              disabled={isLoading}
              type="submit"
              className="hover:brightness-110 hover:bg-emerald-500/20"
            >
              Login
            </Button>
          </DialogFooter>
        </form>
        <Button
          type="submit"
          className="hover:brightness-110 hover:bg-emerald-500/20"
        >
          Don&apos;t have an account? Sign Up
        </Button>
      </DialogContent>
    </Dialog>
  );
}
