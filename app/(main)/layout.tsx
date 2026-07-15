"use client";

import React from "react";
import { Layout } from "antd";
import HeaderClient from "@/app/components/HeaderClient";

const { Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderClient />
      <Content style={{ margin: 0 }}>{children}</Content>
    </Layout>
  );
}
