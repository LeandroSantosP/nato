import { ArrowDown, SendHorizontal, X } from "lucide-react";
import { AvatarImage, Avatar, AvatarFallback } from "./ui/avatar";
import { messages } from "../lib/messages";

export default function Chat() {
  return (
    <section className="flex max-w-80 overflow-hidden flex-col rounded-r-lg w-[36rem] border-r-0 border border-my-gray-01 ">
      <button className="absolute  text-emerald-400 top-[1/2] right-2">
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
                  <span className="text-zinc-400 text-nowrap font-semibold">
                    {item.name}:{" "}
                  </span>
                  {item.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center mx-1 px-3 py-1.5 border border-white/10 rounded gap-3">
        <input
          className="bg-transparent flex-1 outline-none h-auto border-0 p-0 tx-sm"
          type="text"
          placeholder="Chat..."
        />
        <button className="text-emerald-400 top-[1/2]">
          <SendHorizontal className="p-1 rounded hover:bg-my-gray-light-two" />
        </button>
      </div>
    </section>
  );
}
