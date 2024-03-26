import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowDown, Send, SendHorizonal, X } from "lucide-react";

let messages = [
	{ name: "John", message: "Hello there!" },
	{ name: "Alice", message: "How are you doing?" },
	{ name: "Bob", message: "Nice weather today, isn't it?" },
	{ name: "Emily", message: "I'm excited for the weekend!" },
	{ name: "Michael", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, eius! Enim neque iure qui vel temporibus rerum ad beatae nihil sint odio, deleniti voluptatibus cupiditate quam eos! Dolor, sequi molestias!" },
	{ name: "Michael", message: "Just finished  Just finished a great book! a great book!" },
	{ name: "Michael", message: "Just finished a great Just finished a great book! book!" },
	{ name: "Michael", message: "Just finished a great book! Just finished a great book!" },
	{ name: "Michael", message: "Life is an incredible journey filled with ups and downs, twists and turns, and unexpected surprises waiting around every corner. It's a journey where we encounter challenges that test our strength and resilience, but also moments of pure joy and celebration. Along the way, we meet people who leave a lasting impact on our lives, shaping us into the individuals we are meant to be." },
	{ name: "Michael", message: "Just finished a great book!" },
	{ name: "Michael", message: "Just finished a great book!" },
	{ name: "Sarah", message: "Life is an incredible journey filled with ups and downs, twists and turns, and unexpected surprises waiting around every corner. It's a journey where we encounter challenges that test our strength and resilience, but also moments of pure joy and celebration. Along the way, we meet people who leave a lasting impact on our lives, shaping us into the individuals we are meant to be." }
];
export default function Chat() {
	return (
		<section className="flex relative max-w-80 overflow-hidden flex-col rounded-lg w-[36rem] border border-my-gray-01 ">
			<button
				className="absolute  text-emerald-400 top-[1/2] right-2" >
				<X className="flex gap-1 p-1 size-7 rounded hover:bg-my-gray-light-two" />
			</button>
			<div className="flex items-center justify-between border-b border-my-gray-01">
				<p className="flex gap-1 p-1 items-center">
					Main Messages...
					<ArrowDown className="size-5" />
				</p>
			</div>
			<div className="flex flex-col flex-1 p-2 gap-3 overflow-auto scrollbar-none">
				{messages.map((item, i) => {
					return (
						<div className="text-sm flex items-center gap-2" key={i}>
							<Avatar className="size-5 self-start">
								<AvatarImage src={"https://i.imgur.com/eHJNhfo.png"} />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<p className="text-zinc-200 break-all">
									<span className="text-zinc-400 text-nowrap font-semibold">{item.name}: </span>
									{item.message}
								</p>
							</div>
						</div>
					)
				})}
			</div>
			<div className="flex min-h-12 items-start p-2 border-t border-my-gray-01 justify-center flex-col relative">
				<Input placeholder="Chat..." className="rounded-x border-none bg-my-gray-light-one" />
				<button className="absolute  text-emerald-400 top-[1/2] right-4" >
					<SendHorizonal className="size-5 p-1 rounded hover:bg-my-gray-light-two" />
				</button>
			</div>
		</section>
	)
}