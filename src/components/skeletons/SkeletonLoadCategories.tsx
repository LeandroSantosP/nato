import { Skeleton } from "../ui/skeleton";

export default function SkeletonVideoDesc() {
	return (
		<>
			<div className="grid grid-cols-3 h-full w-full flex-col gap-2 p-3">
				{Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="w-full  min-h-44 gap-2 p-2 bg-zinc-700 rounded-xl" />
				)}
			</div>
		</>
	)
}