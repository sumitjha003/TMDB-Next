"use client";
import React, { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Image from "next/image";

const LoginModal = dynamic(() => import("./LoginModal"), { ssr: false });

export type Movie = {
  id?: string | null;
  title?: string | null;
  imageUrl?: string | null;
  releaseDate?: string | null;
};

export type MovieCardProps = {
  movies: Movie;
  onDelete?: () => void;
  onEdit?: (id: string) => void;
  priority?: boolean;
  showActions?: boolean;
  smallActions?: boolean;
};

const MovieCard: React.FC<MovieCardProps> = ({
  movies,
  onDelete = () => {},
  onEdit = () => {},
  priority = false,
  showActions = true,
  smallActions = false,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"edit" | "delete" | null>(
    null
  );
  const pathname = usePathname();

  const handleCardClick = () => {
    if (!movies.id) return;
    router.push(`/movies/${movies.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!movies.id) return;
    if (!session) {
      setPendingAction("edit");
      setLoginModalOpen(true);
      return;
    }
    onEdit(movies.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!movies.id) return;
    if (!session) {
      setPendingAction("delete");
      setLoginModalOpen(true);
      return;
    }
    onDelete();
  };

  const getCallbackUrl = () => {
    if (!movies.id || !pendingAction) return pathname;
    const separator = pathname.includes("?") ? "&" : "?";
    return `${pathname}${separator}${pendingAction}=${movies.id}`;
  };

  return (
    <>
      <div
        className="relative group w-full aspect-4/5 max-w-90 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:z-20 hover:border-white/40"
        onClick={handleCardClick}
      >
        <Image
          alt={movies.title || "Movie poster"}
          src={movies.imageUrl || "/placeholder.png"}
          fill
          priority={priority}
          className="object-cover transition-transform duration-100 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 220px"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        <div
          className="absolute bottom-0 left-0 right-0 p-4 text-white 
                transition-transform duration-300 
                group-hover:-translate-y-16"
        >
          <h3 className="text-lg font-bold line-clamp-2 drop-shadow-lg">
            {movies.title || "Untitled"}
          </h3>
          <p className="text-sm text-white/80 mt-1">
            {movies.releaseDate
              ? dayjs(movies.releaseDate).format("D MMM YYYY")
              : "Unknown"}
          </p>
        </div>

        {showActions && (
          <div
            className="absolute inset-x-0 bottom-0 p-4 flex justify-between items-center
        translate-y-full group-hover:translate-y-0
        transition-all duration-300 ease-out z-20"
          >
            <button
              onClick={handleEditClick}
              className={`
      flex items-center gap-2 rounded-xl
      bg-[#01B4E4]/20 backdrop-blur-md
      border border-[#01B4E4]/40
      cursor-pointer
      text-[#01B4E4] font-medium
      hover:bg-[#01B4E4]/30 hover:border-[#01B4E4]/60
      transition-all duration-300
      shadow-[0_0_20px_rgba(1,180,228,0.25)]
      ${smallActions ? "px-2 py-1 text-xs" : "px-4 py-2 text-sm"}
    `}
            >
              <EditOutlined
                style={{ fontSize: smallActions ? "12px" : "14px" }}
              />
              Edit
            </button>

            <button
              onClick={handleDeleteClick}
              className={`
      flex items-center gap-2 rounded-xl
      bg-red-500/15 backdrop-blur-md
      border border-red-400/30
      cursor-pointer
      text-red-300 font-medium
      hover:bg-red-500/25 hover:border-red-400/50
      transition-all duration-300
      shadow-[0_0_20px_rgba(239,68,68,0.25)]
      ${smallActions ? "px-2 py-1 text-xs" : "px-4 py-2 text-sm"}
    `}
            >
              <DeleteOutlined
                style={{ fontSize: smallActions ? "12px" : "14px" }}
              />
              Delete
            </button>
          </div>
        )}
      </div>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => {
          setLoginModalOpen(false);
          setPendingAction(null);
        }}
        message={`To ${pendingAction} this movie, you need to login first.`}
        callbackUrl={getCallbackUrl()}
      />
    </>
  );
};

export default React.memo(MovieCard);
