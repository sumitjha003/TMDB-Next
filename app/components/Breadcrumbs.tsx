"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { GET_MOVIE_BY_ID } from "@/app/graphql/queries";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const lastPart = parts[parts.length - 1];

  // Detect UUID (your movie ID format)
  const isMovieId = /^[0-9a-fA-F-]{36}$/.test(lastPart);

  // Fetch movie title if last part is ID
  const { data } = useQuery(GET_MOVIE_BY_ID, {
    skip: !isMovieId,
    variables: { movieId: lastPart },
  });

  const movieTitle = data?.movie?.data?.title;

  const crumbs = parts.map((part, index) => {
    const href = "/" + parts.slice(0, index + 1).join("/");

    let label = part
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    // Replace ID with movie title
    if (index === parts.length - 1 && isMovieId && movieTitle) {
      label = movieTitle;
    }

    return { href, label };
  });

  return (
    <nav className="flex gap-2 text-sm mb-4 text-white">

      <Link href="/" className="text-white hover:underline">
        Home
      </Link>

      {crumbs.map((crumb, index) => (
        <span key={crumb.href} className="flex items-center gap-2">
          ›
          {index === crumbs.length - 1 ? (
            <span className="font-bold">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="text-white hover:underline">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
