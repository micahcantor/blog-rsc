import { PageProps } from "@parcel/rsc";
import Base from "../../components/Base";
import { BlueskyCallback } from "../../components/BlueskyCallback";

export default function CallbackPage({ pages, currentPage }: PageProps) {
	return (
		<Base
			title="Redirecting..."
			description="Redirecting after Bluesky authentication"
		>
			<BlueskyCallback />
		</Base>
	);
}
