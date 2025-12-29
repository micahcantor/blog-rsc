"use client-entry";

import type { ReactNode } from "react";
import { hydrate, fetchRSC } from "@parcel/rsc/client";
import { RSCNavigation } from "./util/rscNavigation";

let updateRoot = hydrate({
	// Intercept HMR window reloads, and do it with RSC instead.
	onHmrReload() {
		console.log("Reloading...");
		navigate(location.pathname);
	},
});

async function navigate(pathname: string, push = false) {
	let rscPath: string;
	if (pathname === "/") {
		rscPath = "/index.rsc";
	} else {
		rscPath = pathname.replace(/\.html$/, ".rsc");
	}
	let root = await fetchRSC<ReactNode>(rscPath);
	updateRoot(root, () => {
		document.getElementById("header")?.scrollIntoView();
		if (push) {
			history.pushState(null, "", pathname);
		}
	});
}

// Intercept link clicks to perform RSC navigation.
document.addEventListener("click", (e) => {
	let link = (e.target as Element).closest("a");
	if (!link || !(link instanceof HTMLAnchorElement) || !link.href) {
		return;
	}
	
	let url = new URL(link.href);
	if (
		(!link.target || link.target === "_self") &&
		link.origin === location.origin &&
		link.dataset.rscNavigation !== RSCNavigation.Disabled &&
		!link.hasAttribute("download") &&
		url.hash === "" && // ignore internal links
		e.button === 0 && // left clicks only
		!e.metaKey && // open in new tab (mac)
		!e.ctrlKey && // open in new tab (windows)
		!e.altKey && // download
		!e.shiftKey &&
		!e.defaultPrevented
	) {
		e.preventDefault();
		navigate(link.pathname, true);
	}
});

// When the user clicks the back button, navigate with RSC.
window.addEventListener("popstate", (e) => {
	navigate(location.pathname);
});
