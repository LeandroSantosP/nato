import { Skeleton } from "../ui/skeleton";

export default function SkeletonVideoDetails() {
	return (
		<>
			<div className="flex w-full flex-col p-2 space-y-3">
				<Skeleton className="h-full w-full bg-zinc-600/50 rounded-xl" />
				<Skeleton className="h-full w-full bg-zinc-600/50 rounded-xl" />
				<div className="space-y-2">
					<Skeleton className="h-4 bg-zinc-600/50" />
					<Skeleton className="h-4 bg-zinc-600/50" />
				</div>
			</div>
		</>
	)
}