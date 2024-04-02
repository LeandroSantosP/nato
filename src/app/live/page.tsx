import VideoStreamSection from "../../components/VideoStreamSection";
import Chat from "@/components/Chat1";

export default function Live() {
  return (
    <main className="p-1 grow w-full flex h-screen">
      <VideoStreamSection />
      <Chat />
    </main>
  );
}
