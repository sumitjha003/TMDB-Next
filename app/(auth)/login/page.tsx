import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import LoginForm from "./LoginForm";
import { authOptions } from "@/app/lib/authOptions";
import { Metadata } from "next";
import { ROUTES } from "@/app/constants/routes";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const resolvedSearchParams = await searchParams;
  const callbackUrl = resolvedSearchParams?.callbackUrl ?? ROUTES.DASHBOARD;

  // Redirect if already logged in (server-side)
  if (session) {
    redirect(callbackUrl);
  }

  return <LoginForm callbackUrl={callbackUrl} />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login | TMDB",
    description:
      "Browse the latest movies, explore details, release dates, and more on TMDB.",

    openGraph: {
      title: "Login | TMDB",
      description:
        "Browse the latest movies, explore details, release dates, and more on TMDB.",
    },
  };
}