"use client";

import VideoStreamSection from "../components/VideoStreamSection";
import Channels from "../components/Channels";
export default function Stream() {
  return (
    <main className="space-y-0.5 flex h-screen flex-col p-2">
      <div className="flex gap-2 grow h-full">
        <Channels />
        <VideoStreamSection />
        <div className="flex rounded-e w-[36rem] bg-zinc-950">3</div>
      </div>
    </main>
  );
}
