"use client"
import SkeletonLoadCategories from "@/components/skeletons/SkeletonLoadCategories";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useCategoriesStore } from "@/providers/CategoriesStorageProvider";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Contents() {
	const { categories: allCategories, getCategories, isLoading } = useCategoriesStore((state) => state);
	const [categoriesFi, setCategoriesFi] = useState("");
	const debouncedValue = useDebounce(categoriesFi, 300);
	useEffect(() => { getCategories() }, [getCategories]);
	if (isLoading) {
		return <SkeletonLoadCategories />
	}
	const categoriesFiltered = allCategories.filter(cate => cate.name.includes(debouncedValue));

	const categories = categoriesFiltered.length > 0 ? categoriesFiltered : [];
	return (
		<main className="space-y-0.5 p-2 w-full flex flex-col h-screen">
			<div className="flex gap-2 items-center">
				<h1>Search: </h1>
				<Input className="max-w-80" value={categoriesFi} onChange={(e) => setCategoriesFi(e.target.value)} />
			</div>
			<section className="flex overflow-auto w-full h-full flex-col gap-10 p-3">
				{categories.map(category => {
					return (
						<div key={category.id} className="flex flex-col">
							<div className="flex gap-2 font-extrabold">
								<PlayIcon className="fill-emerald-600 text-emerald-600" />
								<h1>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</h1>
							</div>
							<div className="flex h-full gap-2 my-6">
								{category.videos.map(video => {
									return (
										<div
											key={video.id}
											className="flex flex-col p-2 rounded-xl">
											<Image src={video.thumbnailUrl} height={10} width={10} quality={80} alt={video.title} className="w-full max-w-[300px] h-full rounded" />
											<h1 className="font-semibold">{video.title}</h1>
											<h1 className="text-gray-300">{new Date(video.createdAt).toLocaleDateString()}</h1>
										</div>
									)
								})}
							</div>
						</div>
					)
				})}
			</section>
		</main>
	);
};