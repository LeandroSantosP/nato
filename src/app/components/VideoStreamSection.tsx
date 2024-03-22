import { Suspense } from "react";
import VideoDesc from "./VideoDesc";

export default function VideoStreamSection() {
  return (
    <div className="w-full overflow-y-auto border-zinc-700 rounded bg-[#1B1B27] border scrollbar scrollbar-w-1 scrollbar-track-black">
      <video
        controls
        className="w-full"
        src="https://firebasestorage.googleapis.com/v0/b/nato-28ddf.appspot.com/o/video%2F8e02ba77-1d13-405f-9910-136f627cc409.mp4?alt=media"
      />
      <Suspense fallback={<h2>Loadding....</h2>}>
        <VideoDesc />
      </Suspense>
    </div>
  );
}
