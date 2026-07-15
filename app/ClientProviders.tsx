"use client";

import ApolloWrapper from "./ApolloWrapper";
import { NotificationProvider } from "./context/Notification";
import { SessionProvider } from "next-auth/react";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ApolloWrapper>
        <NotificationProvider>{children}</NotificationProvider>
      </ApolloWrapper>
    </SessionProvider>
  );
}