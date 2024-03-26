
interface ContentDetailsProps {
	params: {
		content_id: string
	}
}
export default function ContentDetails({ params }: ContentDetailsProps) {
	return <p>Post: {params.content_id}</p>
}