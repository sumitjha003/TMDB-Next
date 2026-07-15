"use client";

import React, { useMemo } from "react";
import { ConfigProvider, theme, Tag, Divider } from "antd";
import { User, Calendar, MapPin, Activity } from "lucide-react";

type Person = {
  id?: string | null;
  name?: string | null;
  gender?: string | null;
  adult?: boolean | null;
  birthday?: string | null;
  popularity?: number | null;
  placeOfBirth?: string | null;
  knownForDepartment?: string | null;
};

type ViewPersonProps = {
  person?: Person | null;
};

const InfoItem = ({
  icon: Icon,
  label,
  value,
  subValue,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  subValue?: string;
}) => (
  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
    <div className="p-3 rounded-lg bg-[#0f172a] text-[#01B4E4] shadow-inner group-hover:scale-110 transition-transform cursor-pointer">
      <Icon size={20} strokeWidth={2.5} style={{ pointerEvents: "none" }} />
    </div>
    <div>
      <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">
        {label}
      </div>
      <div className="text-white text-base font-medium leading-snug">
        {value}
      </div>
      {subValue && <div className="text-white/30 text-xs mt-1">{subValue}</div>}
    </div>
  </div>
);

export default function ViewPersonClient({ person }: ViewPersonProps) {
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

  const birthday = person?.birthday;
  const formattedDate = useMemo(() => {
    if (!birthday) return "N/A";
    return new Date(birthday).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [birthday]);

  if (!person) return null;

  const initials = getInitials(person.name || "?");
  const gradient = getGradient(person.name || "");

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#01B4E4",
        },
        components: {
          Modal: {
            contentBg: "transparent",
            boxShadow: "none",
          },
        },
      }}
    >
      <div className="bg-linear-to-br from-[#020617] via-[#020617] to-[#0f172a] overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl">
        <div
          className={`absolute top-0 right-0 w-96 h-96  bg-linear-to-br from-[#1e293b] via-[#0f172a] to-[#020617] opacity-10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none`}
        />

        <div className="relative p-8 md:p-10 pb-0 flex flex-col items-center text-center z-10">
          <div
            className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-br ${gradient} flex items-center justify-center shadow-[0_0_40px_rgba(1,180,228,0.2)] mb-4 ring-4 ring-[#0f172a] ring-offset-4 ring-offset-white/5`}
          >
            <span className="text-5xl md:text-6xl font-black text-white mix-blend-overlay opacity-80 tracking-tighter select-none">
              {initials}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            {person.name}
          </h1>

          <div className="flex items-center gap-3 justify-center ">
            <Tag className="bg-white/10 border-white/10 text-white/70 px-3 py-1 m-0 rounded-full font-bold uppercase text-[10px] tracking-wide">
              {person.knownForDepartment || "Talent"}
            </Tag>
          </div>
        </div>

        <Divider className="border-white/10 my-0" />

        <div className="p-8 md:p-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              icon={User}
              label="Gender"
              value={person.gender || "Not specified"}
            />

            <InfoItem
              icon={Calendar}
              label="Birthday"
              value={formattedDate}
              subValue={person.placeOfBirth || undefined}
            />

            <InfoItem
              icon={MapPin}
              label="Place of Birth"
              value={person.placeOfBirth || "Unknown location"}
            />

            <InfoItem
              icon={Activity}
              label="Popularity"
              value={
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#01B4E4] to-cyan-300">
                    {person.popularity?.toFixed(1) || "0"}
                  </span>
                  <span className="text-xs text-white/30">Score</span>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
