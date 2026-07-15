"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import { LogIn, LogOut, User } from "lucide-react";
import { PlusOutlined } from "@ant-design/icons";
import { ROUTES } from "../constants/routes";
import { Tooltip } from "antd";

const LoginModal = dynamic(() => import("./LoginModal"), { ssr: false });

const navItems = [
  { key: "dashboard", label: "Dashboard", href: ROUTES.DASHBOARD },
  { key: "movies", label: "Movies", href: ROUTES.MOVIES },
  { key: "person", label: "Persons", href: ROUTES.PERSON },
];

export default function HeaderClient() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginCallbackUrl, setLoginCallbackUrl] = useState("");
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Determine active nav item
  const selectedKey = (() => {
    if (pathname === "/" || pathname.startsWith(ROUTES.DASHBOARD))
      return "dashboard";
    if (pathname.startsWith(ROUTES.MOVIES)) return "movies";
    if (pathname.startsWith(ROUTES.PERSON)) return "person";
    return "";
  })();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        background: "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        height: "70px",
      }}
    >
      {/* Logo */}
      <Link href={ROUTES.DASHBOARD} className="flex items-center gap-4">
        <svg
          className="h-12 w-auto"
          viewBox="0 0 185.04 133.4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="tmdb-logo-gradient"
              x1="0"
              y1="66.7"
              x2="185.04"
              y2="66.7"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#90cea1" />
              <stop offset="0.56" stopColor="#3cbec9" />
              <stop offset="1" stopColor="#00b3e5" />
            </linearGradient>
          </defs>
          <path
            fill="url(#tmdb-logo-gradient)"
            d="M51.06,66.7h0A17.67,17.67,0,0,1,68.73,49h-.1A17.67,17.67,0,0,1,86.3,66.7h0A17.67,17.67,0,0,1,68.63,84.37h.1A17.67,17.67,0,0,1,51.06,66.7Zm82.67-31.33h32.9A17.67,17.67,0,0,0,184.3,17.7h0A17.67,17.67,0,0,0,166.63,0h-32.9A17.67,17.67,0,0,0,116.06,17.7h0A17.67,17.67,0,0,0,133.73,35.37Zm-113,98h63.9A17.67,17.67,0,0,0,102.3,115.7h0A17.67,17.67,0,0,0,84.63,98H20.73A17.67,17.67,0,0,0,3.06,115.7h0A17.67,17.67,0,0,0,20.73,133.37Zm83.92-49h6.25L125.5,49h-8.35l-8.9,23.2h-.1L99.4,49H90.5Zm32.45,0h7.8V49h-7.8Zm22.2,0h24.95V77.2H167.1V70h15.35V62.8H167.1V56.2h16.25V49h-24ZM10.1,35.4h7.8V6.9H28V0H0V6.9H10.1ZM39,35.4h7.8V20.1H61.9V35.4h7.8V0H61.9V13.2H46.75V0H39Zm41.25,0h25V28.2H88V21h15.35V13.8H88V7.2h16.25V0h-24Zm-79,49H9V57.25h.1l9,27.15H24l9.3-27.15h.1V84.4h7.8V49H29.45l-8.2,23.1h-.1L13,49H1.2Zm112.09,49H126a24.59,24.59,0,0,0,7.56-1.15,19.52,19.52,0,0,0,6.35-3.37,16.37,16.37,0,0,0,4.37-5.5A16.91,16.91,0,0,0,146,115.8a18.5,18.5,0,0,0-1.68-8.25,15.1,15.1,0,0,0-4.52-5.53A18.55,18.55,0,0,0,133.07,99,33.54,33.54,0,0,0,125,98H113.29Zm7.81-28.2h4.6a17.43,17.43,0,0,1,4.67.62,11.68,11.68,0,0,1,3.88,1.88,9,9,0,0,1,2.62,3.18,9.87,9.87,0,0,1,1,4.52,11.92,11.92,0,0,1-1,5.08,8.69,8.69,0,0,1-2.67,3.34,10.87,10.87,0,0,1-4,1.83,21.57,21.57,0,0,1-5,.55H121.1Zm36.14,28.2h14.5a23.11,23.11,0,0,0,4.73-.5,13.38,13.38,0,0,0,4.27-1.65,9.42,9.42,0,0,0,3.1-3,8.52,8.52,0,0,0,1.2-4.68,9.16,9.16,0,0,0-.55-3.2,7.79,7.79,0,0,0-1.57-2.62,8.38,8.38,0,0,0-2.45-1.85,10,10,0,0,0-3.18-1v-.1a9.28,9.28,0,0,0,4.43-2.82,7.42,7.42,0,0,0,1.67-5,8.34,8.34,0,0,0-1.15-4.65,7.88,7.88,0,0,0-3-2.73,12.9,12.9,0,0,0-4.17-1.3,34.42,34.42,0,0,0-4.63-.32h-13.2Zm7.8-28.8h5.3a10.79,10.79,0,0,1,1.85.17,5.77,5.77,0,0,1,1.7.58,3.33,3.33,0,0,1,1.23,1.13,3.22,3.22,0,0,1,.47,1.82,3.63,3.63,0,0,1-.42,1.8,3.34,3.34,0,0,1-1.13,1.2,4.78,4.78,0,0,1-1.57.65,8.16,8.16,0,0,1-1.78.2H165Zm0,14.15h5.9a15.12,15.12,0,0,1,2.05.15,7.83,7.83,0,0,1,2,.55,4,4,0,0,1,1.58,1.17,3.13,3.13,0,0,1,.62,2,3.71,3.71,0,0,1-.47,1.95,4,4,0,0,1-1.23,1.3,4.78,4.78,0,0,1-1.67.7,8.91,8.91,0,0,1-1.83.2h-7Z"
          />
        </svg>
      </Link>

      <nav className="hidden md:flex items-center gap-2 text-lg">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`relative px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300
        ${
          selectedKey === item.key
            ? "text-white drop-shadow-md"
            : "text-white/50 hover:text-white"
        }`}
          >
            {item.label}

            {selectedKey === item.key && (
              <span className="absolute left-1/2 -bottom-1 w-10 h-0.5 -translate-x-1/2 bg-[#01B4E4] rounded-full" />
            )}

            {selectedKey === item.key && (
              <span className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm -z-10 ring-1 ring-white/20" />
            )}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4 relative" ref={drawerRef}>
        {(() => {
          const isPerson = pathname.startsWith(ROUTES.PERSON);
          const isDashboard =
            pathname === "/" || pathname.startsWith(ROUTES.DASHBOARD);
          const isCreateMovie = pathname.includes("create"); // Covers /movies/create

          if (isDashboard || isCreateMovie) return null;

          const handleCreate = () => {
            if (session) {
              if (isPerson) router.push("/person?create=true");
              else router.push(ROUTES.CREATE_MOVIE);
            } else {
              if (isPerson) setLoginCallbackUrl("/person?create=true");
              else setLoginCallbackUrl(ROUTES.CREATE_MOVIE);
              setLoginModalOpen(true);
            }
          };

          return (
            <Tooltip
              placement="bottomRight"
              title={
                !session
                  ? "To create movie/person you need to login first"
                  : isPerson
                  ? "Add New Person"
                  : "Create New Movie"
              }
            >
              <button
                onClick={handleCreate}
                className="w-10 h-10 rounded-2xl bg-linear-to-br from-[#90CEA1] via-[#3CBEC9] to-[#01B4E4]
                   flex items-center justify-center transition-all duration-300 shadow-lg group hover:scale-105 cursor-pointer"
              >
                <PlusOutlined className="text-white font-bold text-lg transition-colors" />
              </button>
            </Tooltip>
          );
        })()}

        <LoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          callbackUrl={loginCallbackUrl}
          message="To create a new entry, you need to be logged in."
        />

        {status === "loading" ? (
          <div
            className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#90CEA1] via-[#3CBEC9] to-[#01B4E4]
                    flex items-center justify-center ring-4 ring-white/20 
                    animate-pulse shadow-lg"
          >
            <User className="w-6 h-6 text-white/50" />{" "}
          </div>
        ) : status === "authenticated" ? (
          <>
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-2xl bg-linear-to-br from-[#90CEA1] via-[#3CBEC9] to-[#01B4E4]
                   flex items-center justify-center ring-4 ring-white/20 hover:ring-white/40 
                   transition-all duration-300 shadow-lg cursor-pointer"
            >
              <User className="w-6 h-6 text-white" />
            </button>

            {open && (
              <div
                className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-[#020617]/95 border border-white/10 
                              shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-white/10">
                  <p className="text-sm font-semibold text-white truncate">
                    {session.user?.name || session.user?.email?.split("@")[0]}
                  </p>
                  <p className="text-xs text-white/60 truncate">
                    {session.user?.email}
                  </p>
                </div>

                <div className="p-3">
                  <button
                    onClick={() => signOut({ callbackUrl: "/dashboard" })}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm 
                               text-red-400 hover:bg-red-500/10 transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => router.push(ROUTES.LOGIN)}
            className="flex items-center gap-2 px-2  rounded-lg text-white/80 hover:text-white 
                       hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            <LogIn className="w-5 h-5" />
            <span className="hidden md:inline">Login</span>
          </button>
        )}
      </div>
    </header>
  );
}
