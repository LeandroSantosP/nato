import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, LogOut, ShieldEllipsis, User } from "lucide-react";

export function SideBarNav({ setShowMenu, showMenu }: any) {
	// const [showMenu, setShowMenu] = useState(true);

	return (
		<div
			className="flex h-full py-2 px-1 flex-col max-w-10 gap-4 justify-between items-center border border-my-gray-01 bg-zinc-950 rounded-lg">
			<div className="flex flex-col gap-2">
				<Button
					className="h-8 w-8 border border-my-gray-01"
					size="icon"
					onClick={() => setShowMenu(!showMenu)}>
					{showMenu ? <ArrowLeft className="size-5" /> : <ArrowRight className="size-5" />}
				</Button>
				<Button
					className="h-8 w-8  border border-my-gray-01"
					size="icon"
				>
					<User className="size-5" />
				</Button>
				<Button
					className="h-8 w-8 border border-my-gray-01"
					size="icon"
				>
					<ShieldEllipsis className="size-5" />
				</Button>
			</div>
			<div className="">
				<Button
					className="h-8 w-8 border border-my-gray-01 bg-emerald-400 text-zinc-800 hover:text-zinc-100"
					size="icon"
				>
					<LogOut className="size-5" />
				</Button>
			</div>
		</div>
	)
}