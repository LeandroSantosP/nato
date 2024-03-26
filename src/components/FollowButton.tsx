"use client"

import { UserRoundPlus, UserX } from "lucide-react";
import { useState } from "react";

export default function FollowButton() {
	const [isActive, setIsActive] = useState(false);
	return (
		<button
			onMouseEnter={() => setIsActive(true)}
			onMouseLeave={() => setIsActive(false)}
			className="right-3 top-2 transition ease-linear delay-75 hover:scale-105 hover:bg-rose-600 hover:text-zinc-900 p-1 rounded items-center justify-center">
			{isActive ? <UserX /> : <UserRoundPlus />}
		</button>
	)
}