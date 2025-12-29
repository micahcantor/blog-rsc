"use client-entry";

import type { ReactNode } from 'react';
import {hydrate, fetchRSC} from '@parcel/rsc/client';

let updateRoot = hydrate({
  // Intercept HMR window reloads, and do it with RSC instead.
  onHmrReload() {
    console.log("Reloading...")
    navigate(location.pathname);
  }
});

// A very simple router. When we navigate, we'll fetch a new RSC payload,
// and in a React transition, stream in the new page. Once complete, we'll
// pushState to update the URL in the browser.
async function navigate(pathname: string, push = false) {
	let path: string;
	if (pathname === "/") {
		path = "/index.rsc";
	} else {
		path = pathname.replace(/\.html$/, '.rsc');
	}
	try {
		let root = await fetchRSC<ReactNode>(path);
	  updateRoot(root, () => {
	    if (push) {
	      history.pushState(null, '', path);
	    }
	  });
	} catch (e) {
		console.error(e);
	}
  
}

// Intercept link clicks to perform RSC navigation.
document.addEventListener('click', e => {
  let link = (e.target as Element).closest('a');
  if (!link || !(link instanceof HTMLAnchorElement) || !link.href) {
		return;
  }
  
	let url = new URL(link.href);
	console.log(url.hash === "");
  if (
    (!link.target || link.target === '_self') &&
    link.origin === location.origin &&
    !link.hasAttribute('download') &&
    url.hash === "" && // ignore internal links
    e.button === 0 && // left clicks only
    !e.metaKey && // open in new tab (mac)
    !e.ctrlKey && // open in new tab (windows)
    !e.altKey && // download
    !e.shiftKey &&
    !e.defaultPrevented
  ) {
		console.log("intercept");
    e.preventDefault();
    navigate(link.pathname, true);
  }
});

// When the user clicks the back button, navigate with RSC.
window.addEventListener('popstate', e => {
	console.log("popstate");
  navigate(location.pathname);
});
