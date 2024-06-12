import { Search } from "lucide-react";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./ui/tooltip";

const categoriesFilterSchema = z.object({
  category_name: z.string().toLowerCase(),
  video_title: z.string().toLowerCase()
});

type CategoriesFilterSchema = z.infer<typeof categoriesFilterSchema>;

export function FilterCategoriesForm() {
  const { register, handleSubmit } = useForm<CategoriesFilterSchema>({
    resolver: zodResolver(categoriesFilterSchema)
  });
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleFilterForm(data: CategoriesFilterSchema) {
    const { searchParams } = new URL(window.location.toString());
    if (data.category_name) {
      searchParams.set("category_name", data.category_name);
    } else {
      searchParams.delete("category_name");
    }
    if (data.video_title) {
      searchParams.set("video_title", data.video_title);
    } else {
      searchParams.delete("video_title");
    }
    replace(`${pathname}?${searchParams.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterForm)}
      className="flex gap-1 items-center"
    >
      <Input
        {...register("category_name")}
        className="max-w-80 border border-my-gray-01"
        placeholder="Search for category name..."
        defaultValue={searchParams.get("category_name")?.toString() || ""}
      />
      <Input
        {...register("video_title")}
        className="max-w-80 border border-my-gray-01"
        placeholder="Search for video title..."
        defaultValue={searchParams.get("video_title")?.toString() || ""}
      />
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              className={`flex items-center p-2 rounded border border-my-gray-01 transition-all hover:cursor-pointer hover:bg-zinc-900`}
            >
              <Search className="text-zinc-400" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Search...</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
