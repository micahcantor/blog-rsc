export function getClientMetadata() {
	const baseUrl = process.env.URL || "https://micahcantor.com";
	return {
		client_id: `${baseUrl}/client-metadata.json`,
		client_name: "Micah Cantor's Blog",
		client_uri: baseUrl,
		logo_uri: `${baseUrl}/logo.png`,
		redirect_uris: [`${baseUrl}/oauth/callback`],
		scope: "atproto transition:generic",
		grant_types: ["authorization_code", "refresh_token"],
		response_types: ["code"],
		token_endpoint_auth_method: "none",
		application_type: "web",
		dpop_bound_access_tokens: true,
	};
}
