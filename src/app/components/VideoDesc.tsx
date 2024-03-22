import { get_profile } from "../api/profile";
import VideoNav from "./VideoNav";
import ViewsAmount from "./ViewsAmount";

export default async function VideoDesc() {
	let [{ avatarUrl, description, username }] = await get_profile("2");
	return (
		<div className="flex flex-col p-4 gap-2">
			<section className="flex items-center justify-between">
				<div className="flex flex-col  max-w-[24rem] space-y-1">
					<h3 className="text-[1.1rem] font-bold">
						Introduction to Python Programming.....
					</h3>
					<div className="flex items-center gap-2 rounded">
						<img src={avatarUrl} className="h-10 w-10 rounded-full" />
						<p className="text-[16px]">{username}</p>
						<p className="font-thin text-zinc-500">Sr. Web Developer</p>
					</div>
				</div>
				<ViewsAmount btSize={30} />
			</section>
			<VideoNav home={{ description }} />
		</div>
	)
}