"use client-entry";

import type { ReactNode } from "react";
import { hydrate, fetchRSC } from "@parcel/rsc/client";
import { RSCNavigation } from "./util/rscNavigation";

let updateRoot = hydrate({
	// Intercept HMR window reloads, and do it with RSC instead.
	onHmrReload() {
		console.log("Reloading...");
		onNavigation();
	},
});

async function onNavigation() {
	let rscHref = location.href;
	if (rscHref.endsWith("/")) {
		rscHref += "index.html";
	}
	rscHref = rscHref.replace(/\.html$/, ".rsc");

	let root = await fetchRSC<ReactNode>(rscHref);
	updateRoot(root, () => {
		window.scrollTo({ left: 0, top: 0 });
	});
}

window.addEventListener("popstate", (e) => {
	onNavigation();
});

const oldPushState = window.history.pushState;
window.history.pushState = function (...args) {
	const result = oldPushState.apply(this, args);
	onNavigation();
	return result;
};

const oldReplaceState = window.history.replaceState;
window.history.replaceState = function (...args) {
	const result = oldReplaceState.apply(this, args);
	onNavigation();
	return result;
};

// Intercept link clicks to perform RSC navigation.
document.addEventListener("click", (e) => {
	let link = (e.target as Element).closest("a");
	if (
		link &&
		link instanceof HTMLAnchorElement &&
		link.href &&
		(!link.target || link.target === "_self") &&
		link.origin === location.origin &&
		link.dataset.rscNavigation !== RSCNavigation.Disabled &&
		!link.hasAttribute("download") &&
		e.button === 0 && // left clicks only
		!e.metaKey && // open in new tab (mac)
		!e.ctrlKey && // open in new tab (windows)
		!e.altKey && // download
		!e.shiftKey &&
		!e.defaultPrevented
	) {
		e.preventDefault();
		history.pushState(null, "", link.href);
	}
});
