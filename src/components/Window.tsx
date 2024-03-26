"use client"
import React, { useState } from "react";
import { SideBarNav } from "./SideBarNav";

export default function Window({ children }: { children: React.ReactNode }) {
	const [showMenu, setShowMenu] = useState(true);

	return (
		<>
			<SideBarNav setShowMenu={setShowMenu} showMenu={showMenu} />
			{showMenu && children}
		</>
	)
}