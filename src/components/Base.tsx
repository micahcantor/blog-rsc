import { ReactNode } from "react";
import "../static/index.css";
import ThemeProvider from "./ThemeProvider";
import { Header } from "./Header";

interface BaseProps {
  title: string,
  description: string,
  thumbnail?: string,
  children: ReactNode,
}

export default function Base({title, description, thumbnail, children}: BaseProps) {
  return (
    <html className="h-full w-full" lang="en">
      <head>
        <meta content="text/html; charset=utf-8" httpEquiv="content-type"/>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
        <meta property="og:type" content="blog" />
        {thumbnail ?? <meta name="image" property="og:image" content={thumbnail} />}
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>{title}</title>
        {/*<link rel="icon" href={icon} />*/}
      </head>
      <body className="h-full w-full overflow-hidden">
        <ThemeProvider>
          <div className="min-h-screen max-w-2xl mx-4 lg:mx-auto pb-8">
       			<Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
