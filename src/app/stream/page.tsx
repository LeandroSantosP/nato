
import VideoStreamSection from "../../components/VideoStreamSection";
import Chat from "@/components/Chat";


export default function Stream() {
  return (
    <main className="gap-1 p-2 grow w-full flex h-screen">
      <VideoStreamSection />
      <Chat />
    </main>
  );
}
