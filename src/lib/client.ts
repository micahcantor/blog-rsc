"use client-entry";

import type { ReactNode } from "react";
import { hydrate, fetchRSC } from "@parcel/rsc/client";

let updateRoot = hydrate({
	// Intercept HMR window reloads, and do it with RSC instead.
	onHmrReload() {
		onNavigation();
	},
});

async function onNavigation() {
	let rscHref = location.href;
	if (rscHref.endsWith("/")) {
		rscHref += "index.html";
	}
	rscHref = rscHref.replace(".html", ".rsc");

	let root = await fetchRSC<ReactNode>(rscHref);
	updateRoot(root, () => {
		window.scrollTo({ left: 0, top: 0 });
	});
}
