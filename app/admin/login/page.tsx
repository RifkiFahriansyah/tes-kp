"use client";

import { useState, useTransition } from "react";
import { Coffee, Lock, Eye, EyeOff } from "lucide-react";
import { loginAction } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg]         = useState<string | null>(null);
  const [isPending, startTransition]    = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) setErrorMsg(result.error);
      // On success, loginAction redirects to /admin — nothing else needed.
    });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cream px-4"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header strip */}
        <div className="bg-forest-green px-8 py-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Coffee className="text-cream" size={28} strokeWidth={1.8} />
            <h1
              className="text-2xl font-black text-cream tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Triple A Admin
            </h1>
          </div>
          <p className="text-cream/60 text-xs tracking-widest uppercase">
            Menu Management Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold text-forest-green tracking-widest uppercase mb-2"
            >
              Admin Password
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-green/40"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-forest-green/20 bg-cream/50 text-forest-green text-sm placeholder:text-forest-green/30 focus:outline-none focus:ring-2 focus:ring-deep-red/40 focus:border-deep-red transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest-green/40 hover:text-forest-green transition"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {errorMsg && (
            <p className="text-[12px] text-deep-red bg-deep-red/8 border border-deep-red/20 rounded-xl px-4 py-2.5 text-center">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-xl bg-deep-red text-white text-sm font-bold tracking-wide
              hover:bg-deep-red/90 active:scale-[0.98] transition-all duration-150
              disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? "Verifying…" : "Enter Dashboard"}
          </button>

          <p className="text-center text-[11px] text-forest-green/40">
            For authorized café staff only.
          </p>
        </form>
      </div>
    </div>
  );
}
