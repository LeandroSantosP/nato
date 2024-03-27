import { ViewIcon } from "lucide-react";
import Image from "next/image";

interface VideoCardProps {
	id: string;
	title: string;
	type: string;
	authorId: string;
	thumbnailUrl: string;
	createdAt: Date;
}
export function VideoCard({ createdAt, id, thumbnailUrl, title, type }: VideoCardProps) {
	return (
		<div
			key={id}
			className={`flex flex-col gap-2 p-2 rounded-xl ${type === "paid" ? "bg-emerald-500/10" : "bg-rose-500/10"} border border-my-gray-01 w-[259px]`}>
			<Image src={thumbnailUrl} height={10} width={10} quality={80} alt={title} className="w-full max-w-[300px] h-full rounded" />
			<h1 className="font-semibold text-sm">{title}</h1>
			<div className="text-gray-300 flex gap-2">
				{(3000).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
				<span>
					{new Date(createdAt).toLocaleDateString()}
				</span>
			</div>
		</div >
	)
}