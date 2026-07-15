"use client";

import React, {
  createContext,
  type PropsWithChildren,
  useContext,
} from "react";
import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";

const NotificationContext = createContext<NotificationInstance | null>(null);

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};


export const useNotification = (): NotificationInstance => {
  const api = useContext(NotificationContext);
  if (!api) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return api;
};