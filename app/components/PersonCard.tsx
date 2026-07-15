"use client";
import React, { useState } from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { ListPersonsQuery } from "@/app/gql/graphql";

type Person = NonNullable<
  NonNullable<ListPersonsQuery["listPersons"]>["data"]
>[number];

const LoginModal = dynamic(() => import("./LoginModal"), { ssr: false });

// Helper functions from PersonClient (moved here or duplicated)
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const getGradient = (name: string) => {
  const gradients = [
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-cyan-500 to-blue-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
};

const getDepartmentColor = (dept: string = "") => {
  switch (dept.toLowerCase()) {
    case "acting":
      return "cyan";
    case "directing":
      return "purple";
    case "production":
      return "gold";
    case "writing":
      return "magenta";
    default:
      return "default";
  }
};

interface PersonCardProps {
  person: Person;
  onView: (person: Person) => void;
  onEdit: (person: Person) => void;
  onDelete: (person: Person) => void;
}

const PersonCard: React.FC<PersonCardProps> = ({
  person,
  onView,
  onEdit,
  onDelete,
}) => {
  const { data: session } = useSession();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"edit" | "delete" | null>(
    null
  );
  const pathname = usePathname();

  if (!person?.id) return null;

  const initials = getInitials(person.name || "?");
  const gradient = getGradient(person.name || "");
  const deptColor = getDepartmentColor(person.knownForDepartment || "");

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) {
      setPendingAction("edit");
      setLoginModalOpen(true);
      return;
    }
    onEdit(person);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) {
      setPendingAction("delete");
      setLoginModalOpen(true);
      return;
    }
    onDelete(person);
  };

  const handlesViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView(person);
  };

  const getCallbackUrl = () => {
    if (!person.id || !pendingAction) return pathname;
    // Assuming the person page URL structure
    return `/person?${pendingAction}=${person.id}`;
  };

  return (
    <>
      <div
        className="group relative aspect-3/4 rounded-2xl bg-[#0f172a]/40 backdrop-blur-md border border-white/5 overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(1,180,228,0.2)] hover:border-white/20 cursor-pointer"
        onClick={() => onView(person)}
      >
        <div
          className={`absolute inset-x-0 top-0 h-[65%] bg-linear-to-br ${gradient} flex items-center justify-center`}
        >
          <span className="text-7xl md:text-8xl font-black text-white mix-blend-overlay opacity-50 tracking-tighter select-none">
            {initials}
          </span>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#0f172a] to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[35%] p-5 flex flex-col justify-end bg-[#0f172a]">
          <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
            <h3 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2">
              {person.name}
            </h3>
            <div className="flex items-center justify-between">
              <Tag
                color={deptColor}
                className="border-none px-2.5 py-0.5 rounded-lg font-bold uppercase text-[10px] tracking-wide shadow-lg"
              >
                {person.knownForDepartment || "Talent"}
              </Tag>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 top-auto h-20 bg-white/10 backdrop-blur-xl border-t border-white/10 flex items-center justify-center gap-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          <Button
            shape="circle"
            size="large"
            icon={<EyeOutlined />}
            className="bg-white/10 border-none text-white hover:bg-[#01B4E4] hover:text-white shadow-lg"
            onClick={handlesViewClick}
          />
          <Button
            shape="circle"
            size="large"
            icon={<EditOutlined />}
            className="bg-white/10 border-none text-white hover:bg-amber-500 hover:text-white shadow-lg"
            onClick={handleEditClick}
          />
          <Button
            shape="circle"
            size="large"
            icon={<DeleteOutlined />}
            className="bg-white/10 border-none text-white hover:bg-red-500 hover:text-white shadow-lg"
            onClick={handleDeleteClick}
          />
        </div>
      </div>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => {
          setLoginModalOpen(false);
          setPendingAction(null);
        }}
        message={`Please sign in to ${pendingAction} records.`}
        callbackUrl={getCallbackUrl()}
      />
    </>
  );
};

export default React.memo(PersonCard);
