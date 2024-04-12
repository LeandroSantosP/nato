import { Skeleton } from "../ui/skeleton";

export default function ProfileScreenLoad() {
  return (
    <>
      <Skeleton className="flex w-[80%] bg-zinc-900 flex-col p-2 gap-3">
        <Skeleton className="flex bg-my-gray-light-one w-full h-full" />
        <Skeleton className="flex bg-my-gray-light-one w-full h-[60%]" />
        <Skeleton className="flex bg-my-gray-light-one w-full h-[10%]" />
      </Skeleton>
      <Skeleton className="flex flex-col w-[20%] h-full p-2 border  border-my-gray-01 bg-my-gray-light-one" />
    </>
  );
}
