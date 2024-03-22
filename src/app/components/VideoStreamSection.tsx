import { Eye } from "lucide-react";
import Avatar from "../stream/Avatar";
import VideoDescription from "./VideoDescription";
import ViewsAmount from "./ViewsAmount";

export default function VideoStreamSection() {
  return (
    <div className="w-full overflow-y-auto border-zinc-700 rounded bg-[#1B1B27] border scrollbar scrollbar-w-1 scrollbar-track-black">
      <video
        controls
        className="w-full"
        src="https://firebasestorage.googleapis.com/v0/b/nato-28ddf.appspot.com/o/video%2F8e02ba77-1d13-405f-9910-136f627cc409.mp4?alt=media"
      />
      <div className="flex flex-col p-4 gap-2">
        <section className="flex items-center justify-between">
          <div className="flex flex-col  max-w-[24rem] space-y-1">
            <h3 className="text-[1.1rem] font-bold">
              Introduction to Python Programming
            </h3>
            <div className="flex items-center gap-2">
              <Avatar h={50} w={50} />
              <p className="text-[16px]">John Doe</p>
              <p className="font-thin text-zinc-500">Sr. Web Developer</p>
            </div>
          </div>
          <ViewsAmount btSize={30} />
        </section>
        <VideoDescription />
      </div>
    </div>
  );
}
