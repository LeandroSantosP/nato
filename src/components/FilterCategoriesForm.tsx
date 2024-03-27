import { Search } from "lucide-react";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const categoriesFilterSchema = z.object({
	category_name: z.string(),
	video_title: z.string()
});

type CategoriesFilterSchema = z.infer<typeof categoriesFilterSchema>

export function FilterCategoriesForm() {
	const { register, handleSubmit } = useForm<CategoriesFilterSchema>({
		resolver: zodResolver(categoriesFilterSchema)
	})
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();

	function handleFilterForm(data: CategoriesFilterSchema) {
		const params = new URLSearchParams(searchParams);
		if (data.category_name) {
			params.set("category_name", data.category_name)
		} else {
			params.delete("category_name")
		}
		if (data.video_title) {
			params.set("video_title", data.video_title)
		} else {
			params.delete("video_title")
		}
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<form
			onSubmit={handleSubmit(handleFilterForm)}
			className="flex gap-1 items-center">
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
			<Button
				type="submit"
				className={`flex items-center p-2 rounded border border-my-gray-01 transition-all hover:cursor-pointer hover:bg-zinc-900`}>
				<Search className="text-zinc-400" />
			</Button>
		</form>
	)
}