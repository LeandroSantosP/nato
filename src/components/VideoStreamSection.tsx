import { Suspense } from "react";
import VideoDesc from "./VideoDesc";

export default function VideoStreamSection() {
  return (
    <div className="w-full overflow-y-auto rounded-l-lg border-r-0 overflow-hidden border-zinc-700 bg-my-gray-dark border scrollbar-none">
      <video
        controls
        className="w-full"
        src="https://firebasestorage.googleapis.com/v0/b/nato-28ddf.appspot.com/o/video%2F4fee6141-ea27-46dd-86b6-d82f59f5b8ff.mp4?alt=media"
      />
      <VideoDesc />
    </div>
  );
}
