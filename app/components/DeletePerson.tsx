"use client";

import React from "react";
import { Modal, message, ConfigProvider, theme, Button } from "antd";
import { Trash2 } from "lucide-react";
import { useMutation } from "@apollo/client/react";

import { DELETE_PERSON } from "../graphql/mutation";
import { revalidatePerson } from "../actions/revalidate";

interface DeletePersonProps {
  personId: string;
  personName?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface DeletePersonResponse {
  deletePerson: {
    message: string;
  };
}

const DeletePerson: React.FC<DeletePersonProps> = ({
  personId,
  personName,
  isOpen,
  onClose,
  onSuccess,
}) => {
  // ... existing code

  const [deletePerson, { loading }] = useMutation<DeletePersonResponse>(
    DELETE_PERSON,
    {
      onCompleted: async (data) => {
        await revalidatePerson();
        message.success(data.deletePerson.message || "Person deleted!");
        onSuccess();
        onClose();
      },
      onError: (err) => {
        message.error(err.message || "Failed to delete person");
      },
    }
  );

  const handleDelete = () => {
    deletePerson({ variables: { deletePersonId: personId } });
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#ef4444",
          borderRadius: 16,
          colorBgContainer: "rgba(255, 255, 255, 0.05)",
          colorBorder: "rgba(255, 255, 255, 0.1)",
        },
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
        closeIcon={null}
        centered
        width={420}
      >
        <div className="bg-linear-to-br from-[#020617] via-[#020617] to-[#0f172a] overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl p-6 rounded-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-linear-to-br from-red-400/20 to-red-600/20 mb-4 shadow-lg shadow-red-500/20 border border-red-500/20">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-2">
              Delete <span className="text-red-500">Person</span>
            </h2>
            <p className="text-slate-400 text-sm">
              Are you sure you want to delete{" "}
              <span className="text-white font-medium">
                {personName || "this person"}
              </span>
              ?
            </p>
          </div>

          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-3 mb-6 text-center text-red-200/80 text-xs">
            This action cannot be undone. This will permanently remove the
            person from your collection.
          </div>

          <div className="flex justify-end gap-3">
            <Button
              onClick={onClose}
              className="h-10 px-5 rounded-xl border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              danger
              type="primary"
              onClick={handleDelete}
              loading={loading}
              className="h-10 px-6 rounded-xl font-bold shadow-lg shadow-red-500/20"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default DeletePerson;
