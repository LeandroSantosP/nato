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
import { Code } from "lucide-react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"


export function LogInForm() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className="p-2 rounded bg-primary text-zinc-100 shadow hover:bg-primary/90 border  text-sm font-medium w-full border-my-gray-01"
				>
					Log In
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-my-gray-dark border border-my-gray-01">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center"><Code /> Iniciar sessão na Twitch Start Section on Nato!</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input id="email" placeholder="peduarte@gmail.com" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Username
						</Label>
						<Input id="username" placeholder="@peduarte" className="col-span-3" />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" className="hover:brightness-110 hover:bg-emerald-500/20">Login</Button>
				</DialogFooter>
				<Button type="submit" className="hover:brightness-110 hover:bg-emerald-500/20">Don&apos;t have an account? Sign Up</Button>
			</DialogContent>
		</Dialog>
	)
}