import * as z from "zod";

export const ArticleExports = z.object({
	metadata: z.object({
		title: z.string(),
		description: z.string(),
		date: z.iso.date(),
		thumbnail: z.optional(z.string()),
		bskyPostId: z.optional(z.string()),
		tags: z.array(z.string()),
	}),
});
