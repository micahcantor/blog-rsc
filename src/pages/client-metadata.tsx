import { writeFile } from "fs/promises";
import Base from "../components/Base";
import { getClientMetadata } from "../oauth-client-metadata";

export default async function ClientMetadataPage() {
	const metadata = getClientMetadata();
	await writeFile(
		"dist/client-metadata.json",
		JSON.stringify(metadata, null, "\t"),
	);

	return (
		<Base title="Client Metadata" description="Bluesky OAuth client metadata">
			Client metadata located at{" "}
			<a className="underline" href="/client-metadata.json">
				/client-metadata.json
			</a>
			.
		</Base>
	);
}
