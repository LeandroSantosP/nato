
import { Bell } from "lucide-react";
import Avatar from "../stream/Avatar";

import ViewsAmount from "./ViewsAmount";

export default function Channels() {
  return (
    <section className="flex p-5 flex-col rounded w-full max-w-64 bg-zinc-950 border-zinc-700 border">
      <div className="flex flex-col">
        <header className=" justify-between text-xs min-h-12 px-3 flex items-center border-[1px] border-zinc-700 mb-3 rounded">
          <h1 className="text-[1rem]">Nato</h1>
          <div className="flex items-center gap-1">
            <Bell className="size-4" />

            <div className="flex flex-col items-end">
              <p className="text-[0.7rem]">John doe</p>
            </div>
            <Avatar />
          </div>
        </header>
      </div>
      <h1 className="font-bold border-b-[1px] border-zinc-700 my-2">
        Channels
      </h1>

      <div className="flex flex-col gap-4 overflow-auto scrollbar scrollbar-w-1 scrollbar-track-black">
        {Array.from({ length: 10 }).map((s, i) => {
          return (
            <div
              className="flex items-center p-3 gap-2 rounded bg-zinc-800 hover:bg-zinc-900 transition-all hover:cursor-pointer"
              key={i}
            >
              <Avatar w={40} h={40} />
              <div className="flex flex-col grow">
                <span className="text-[0.7rem]">John Doe</span>
                <span className="text-sm">Programm</span>
              </div>
              <ViewsAmount content="100" variant="primary" btSize={20} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
