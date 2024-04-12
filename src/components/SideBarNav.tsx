import { getCookie, setCookie } from "@/utils/cookies";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  ArrowRight,
  LogOut,
  ShieldEllipsis,
  User
} from "lucide-react";
import { useQuery } from "react-query";
import { get_profile_fake } from "@/api/profile";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SideBarNav({ setShowMenu, showMenu }: any) {
  const useRoute = useRouter();
  const token = getCookie("token");
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", token],
    queryFn: () => {
      if (!token) {
        return;
      }
      return get_profile_fake(token);
    }
  });
  function logOut() {
    setCookie("token", "", 0);
    useRoute.refresh();
  }
  return (
    <div className="flex h-full py-2 px-1 flex-col max-w-10 justify-between items-center border border-my-gray-01 bg-zinc-950 rounded-lg">
      <div className="flex flex-col gap-2">
        <Button
          className="h-8 w-8 border border-my-gray-01"
          size="icon"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
            <ArrowLeft className="size-5" />
          ) : (
            <ArrowRight className="size-5" />
          )}
        </Button>
        {!isLoading && profile?.roles.includes("ADMIN") && (
          <>
            <Link
              href={`/profile/${profile?.login}`}
              className="h-8 w-8 flex items-center justify-center rounded bg-my-gray-light-one/50 border border-my-gray-01"
            >
              <User className="size-5" />
            </Link>
            <Button className="h-8 w-8 border border-my-gray-01" size="icon">
              <ShieldEllipsis className="size-5" />
            </Button>
          </>
        )}
      </div>
      <div className="">
        <Button
          onClick={logOut}
          className="h-8 w-8 border border-my-gray-01 bg-emerald-400 text-zinc-800 hover:text-zinc-100"
          size="icon"
        >
          <LogOut className="size-5" />
        </Button>
      </div>
    </div>
  );
}
