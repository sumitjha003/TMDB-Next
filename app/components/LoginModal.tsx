"use client";

import React from "react";
import { Modal, Button, Typography, Space, ConfigProvider } from "antd";
import { signIn } from "next-auth/react";
import { UserOutlined, ArrowRightOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  callbackUrl?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  message = "For this action you need to login",
  callbackUrl,
}) => {
  const handleLogin = () => {
    signIn("credentials", {
      callbackUrl: callbackUrl || window.location.href,
      redirect: true,
    });
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "transparent",
            boxShadow: "none",
          },
        },
      }}
    >
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        centered
        closable={false}
        width={400}
        styles={{
          mask: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
          },
          body: { padding: 0 },
        }}
      >
        <div className="bg-slate-50 border border-slate-200 rounded-4xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-blue-100/50 to-transparent" />

          <div className="text-center p-10 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-slate-800 text-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <UserOutlined />
            </div>

            <Title level={3} className="mb-2! font-bold! text-slate-900!">
              Sign In Required
            </Title>

            <Text className="text-slate-600 text-base block mb-8 leading-relaxed px-4">
              {message}
            </Text>

            <Space orientation="vertical" className="w-full" size={12}>
              <Button
                type="primary"
                size="large"
                block
                onClick={handleLogin}
                className="h-14 rounded-2xl bg-slate-900! hover:bg-slate-800! border-none text-base font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                Continue <ArrowRightOutlined className="text-sm" />
              </Button>
              <Button
                type="text"
                block
                onClick={onClose}
                className="text-slate-700! hover:text-slate-900! h-10 font-extrabold"
              >
                Not now
              </Button>
            </Space>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default LoginModal;
