import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Code } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ErrorFormMessage from "./ErroFormMessage"


const SignUpFilterSchema = z.object({
	email: z.string().email("Email format is not valid!"),
	username: z.string(),
	password: z.string().min(10, "Password must be at least 10 character(s)!")
});

type SigInFilterSchema = z.infer<typeof SignUpFilterSchema>

export function SignUpForm() {
	const { register, handleSubmit, formState: { errors } } = useForm<SigInFilterSchema>({
		resolver: zodResolver(SignUpFilterSchema)
	});


	async function handleSignUpForm({ email, password, username }: SigInFilterSchema) {
		try {
			console.log(email, password, username);

		} catch (error) {
			alert("Erro on sign-in!");
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className="p-2 rounded bg-primary text-zinc-900 hover:text-zinc-100 shadow hover:bg-primary/90 border bg-emerald-500 text-sm font-medium w-full border-my-gray-01"
				>
					Sign Up
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-my-gray-dark border border-my-gray-01">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center"><Code /> Join Nato Right Now!</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(handleSignUpForm)}
					className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Username
						</Label>
						<Input
							{...register("username")}
							id="username" placeholder="Pedro Duarte" className="col-span-3"
						/>
						{errors.username?.message && <ErrorFormMessage message={errors.username.message} />}
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input
							{...register("email")}
							id="email" placeholder="johnDoe@gmail.com" className="col-span-3"
						/>
						{errors.email?.message && <ErrorFormMessage message={errors.email.message} />}
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="password" className="text-right">
							Password
						</Label>
						<Input
							{...register("password")}
							type="password"
							id="password" placeholder="******" className="col-span-3"
						/>
						{errors.password?.message && <ErrorFormMessage message={errors.password.message} />}
					</div>
					<DialogFooter>
						<Button type="submit" className="hover:brightness-110 hover:bg-emerald-500/20">Sing In</Button>
					</DialogFooter>
				</form>

			</DialogContent>
		</Dialog>
	)
}