"use client";
import { ROUTES } from "@/app/constants/routes";
import { useNotification } from "@/app/context/Notification";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

interface LoginFormProps {
  callbackUrl: string;
}

export default function LoginForm({ callbackUrl }: LoginFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const notification = useNotification();

  useEffect(() => {
    router.prefetch(callbackUrl);
  }, [callbackUrl, router]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors = { email: "", password: "" };
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const res: SignInResponse | undefined = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
      callbackUrl,
    });

    if (res?.error) {
      setErrors({ email: "", password: "Incorrect email or password" });
      setLoading(false);
      return;
    }
    startTransition(() => {
      router.push(callbackUrl);
    });
    notification.success({
      title: "Success",
      description: "Logged in successfully!",
      placement: "top",
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-linear-to-br from-purple-400/30 to-pink-400/30 backdrop-blur-sm mb-6 shadow-lg">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-3 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-white drop-shadow-md text-base font-medium">
          Sign in to continue your journey
        </p>
      </div>

      {/* Alert message */}
      {callbackUrl !== ROUTES.DASHBOARD && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/20 backdrop-blur-sm border border-red-300/30 animate-slide-down">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-red-200 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-100 text-sm font-medium">
              Please login to continue
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-bold text-white drop-shadow-md ml-1"
          >
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200">
              <svg
                className="w-5 h-5 text-white/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-12 pl-12 pr-4 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl text-white font-medium placeholder:text-white/60 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all duration-200 hover:bg-white/20"
            />
          </div>
          {errors.email && (
            <p className="text-red-200 text-xs ml-1 mt-1 flex items-center gap-1 animate-shake">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-bold text-white drop-shadow-md ml-1"
          >
            Password
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200">
              <svg
                className="w-5 h-5 text-white/50 group-focus-within:text-white/80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full h-12 pl-12 pr-4 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl text-white font-medium placeholder:text-white/60 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all duration-200 hover:bg-white/20"
            />
          </div>
          {errors.password && (
            <p className="text-red-200 text-xs ml-1 mt-1 flex items-center gap-1 animate-shake">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.password}
            </p>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 h-12 bg-transparent border border-white/30 rounded-xl text-white font-semibold text-base hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 h-12 bg-linear-to-r from-white/25 to-white/15 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold text-base shadow-lg hover:shadow-xl hover:from-white/35 hover:to-white/25 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
