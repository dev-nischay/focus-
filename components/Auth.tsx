"use client";
import { useState } from "react";
import { SignIn } from "./Signin";
import { SignUp } from "./Signup";
export function Auth() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="bg-[#FAF7F2] p-12 flex flex-col  ">
      {/* Tabs */}
      <div className="flex gap-0 bg-[#EBE2D4] rounded-xl p-1 w-fit mb-7">
        {(["signin", "signup"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 rounded-[9px] text-sm font-medium transition-all duration-150 ${
              tab === t ? "bg-white text-[#3C2A14] shadow-sm" : "text-[#8B7A63] hover:text-[#5A4A35]"
            }`}
          >
            {t === "signin" ? "Sign in" : "Sign up"}
          </button>
        ))}
      </div>

      {/* ── Sign-in form ── */}
      {tab === "signin" && <SignIn setTab={setTab} />}

      {/* ── Sign-up form ── */}
      {tab === "signup" && <SignUp setTab={setTab} />}
    </div>
  );
}
