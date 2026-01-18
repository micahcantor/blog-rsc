# BlueSky Comments

I'm planning to add BlueSky-powered comments to my blog. This blog is built using React Server Components and Parcel. It is fully statically generated. This document outlines an implementation plan for this feature.

## User Story

Blog article content can be found in `src/pages/blog/`. The articles are written using MDX. I plan to add a client component at the bottom of each article page. This page will display existing comments, and allow the user to post a new comment. To post, the user will have to authenticate with BlueSky using OAuth. Essentially, this comment section will act as a simple BlueSky client that alows reading and posting to a single post.

## Bluesky OAuth

I plan to use `@bluesky-social/oauth-client-browser` as a client SDK for implementing OAuth. The client should be initialized in `src/client.tsx` (this file is executed by Parcel once on the client side, when the site loads). The public facing metadata will be available at `/client-metadata.json` (defined at `src/static/client-metadata.json`).

If a user hasn't yet been authenticated, there should be a button in the comment section to begin the OAuth flow. If successful, the client should save the `did` and handle in local storage.

For more info, see README: https://github.com/bluesky-social/atproto/blob/main/packages/oauth/oauth-client-browser/README.md

## Bluesky API

I plan to use `@bluesky-social/api` to interact with Bluesky with an authenticated session.

Each post using bluesky comments will define a `bskyURL` in the metadata ( see `src/util/article`). This will point to a Bluesky post that I will create for commenting on the article.

## Implementation Plan

I have to work around a bug in Parcel, where importing the bluesky oauth SDK directly in a client component causes a crash. Because of this, I have to lazy load the bluesky

The first step is to build a working demo of the OAuth flow. To do this we need:

- A button on the blog article page to sign-in with Bluesky
- A callback URI that stores the session data and redirects back to the blog page.

The second step is to build out a UI to view existing Bluesky comments for the post.

The last step is to build out a UI to allow users to post new Bluesky comments.
