import { Skeleton } from "../ui/skeleton";

export default function SkeletonVideoDesc() {
	return (
		<div className="flex flex-col p-2 space-y-3">
			<Skeleton className="h-[125px] w-full bg-zinc-700 rounded-xl" />
			<div className="space-y-2">
				<Skeleton className="h-4 bg-zinc-700" />
				<Skeleton className="h-4 bg-zinc-700" />
			</div>
		</div>
	)
}