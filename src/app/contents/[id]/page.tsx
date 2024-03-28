import { get_categories_by_name } from "@/api/categories"
import { delay } from "@/api/profile";
import { VideoCard } from "@/components/VideoCard";
import VideoDesc from "@/components/VideoDesc";

interface ContentDetailsProps {
	params: {
		id: string
	}
}

export default async function ContentDetails({ params }: ContentDetailsProps) {
	await delay(3000)
	const allVideos = (await get_categories_by_name({})).filter(cate => cate.name === "all");

	return (
		<main className="flex flex-col w-full p-2">
			<section className="flex h-full scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-zinc-800 overflow-auto">
				<div className="w-full space-y-4">
					<video
						controls
						className="rounded-lg w-full self-start"
						src="https://firebasestorage.googleapis.com/v0/b/nato-28ddf.appspot.com/o/video%2F8e02ba77-1d13-405f-9910-136f627cc409.mp4?alt=media"
					/>
					<VideoDesc />
				</div>
				<div className="flex scrollbar-none gap-2 items-center overflow-auto flex-col max-w-72 w-full">
					{allVideos.map(category => {
						return category.videos.map(video => {
							return <VideoCard key={video.id} {...video} />
						})
					})}
				</div>
			</section>
		</main>
	)
}