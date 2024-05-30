"use client";

import { ArrowDown, SendHorizontal, X } from "lucide-react";
import { AvatarImage, Avatar, AvatarFallback } from "./ui/avatar";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCookie } from "@/utils/cookies";
import { useQuery } from "react-query";
import { get_profile } from "@/api/profile";
import { useEffect, useState } from "react";

type MessageType = "JOIN" | "CHAT" | "LEAVE";

type MessagePayload = {
  author: string;
  body: string;
  messageType: MessageType;
};

let stompClient: Stomp.Client | null = null;
export default function Chat() {
  const token = getCookie("token");
  const [publicMessages, setPublicMessages] = useState<MessagePayload[]>([]);
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", token],
    queryFn: () => {
      if (!token) {
        return;
      }
      return get_profile(token);
    },
    onSuccess() {
      // wsConnection();
    }
  });

  const wsConnection = () => {
    const socket = new SockJS("http://localhost:4545/conect");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = (frame: Stomp.Frame | undefined) => {
    if (!frame) {
      return;
    }
    if (stompClient && profile && frame.body.trim()) {
      stompClient.subscribe("/topic/public", onMessageReceived);
      const message: MessagePayload = {
        author: profile.profile.username,
        body: "John Doe Entry in the chat!",
        messageType: "JOIN"
      };
      stompClient.send("/app/chat.addUser", {}, JSON.stringify(message));
    }
  };

  const onMessageReceived = (message: Stomp.Message) => {
    const messageBody: MessagePayload = JSON.parse(message.body);
    switch (messageBody.messageType) {
      case "JOIN":
        publicMessages.push(messageBody);
        setPublicMessages([...publicMessages]);
        break;
      case "CHAT":
        publicMessages.push(messageBody);
        setPublicMessages([...publicMessages]);
    }
  };

  const onError = (frame: String | Stomp.Frame) => {
    console.log("Something Going Wrong Ws: " + frame);
  };

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
        {publicMessages.map((item, i) => {
          return (
            <div className="text-sm flex items-center gap-2" key={i}>
              <Avatar className="size-5 self-start">
                <AvatarImage src={"https://i.imgur.com/eHJNhfo.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-zinc-200 break-all">
                  <span className="text-zinc-400 text-nowrap font-semibold">
                    {item.author}:{" "}
                  </span>
                  {item.body}
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
