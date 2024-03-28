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

export function SignUpForm() {
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
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Username
						</Label>
						<Input id="name" placeholder="Pedro Duarte" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="password" className="text-right">
							Password
						</Label>
						<Input id="password" placeholder="******" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input id="email" placeholder="peduarte" className="col-span-3" />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" className="hover:brightness-110 hover:bg-emerald-500/20">Sing In</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}