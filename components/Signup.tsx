"use client";

import { MailIcon, LockIcon, NotebookIcon } from "@/ui/icons/icons";
import { EyeBtn } from "@/ui/EyeToggleBtn";
import { PrimaryBtn } from "./Button";
import { Divider } from "@/ui/Divider";
import { useState } from "react";
import { GoogleBtn } from "./Button";
import { Field, InputWrap } from "@/ui/InputWrap";
import { Dispatch, SetStateAction } from "react";

export function SignUp({ setTab }: { setTab: Dispatch<SetStateAction<"signin" | "signup">> }) {
  const inputCls = "w-full bg-transparent border-0 outline-none text-sm text-[#2C2416] placeholder-[#B0A090] pr-10";
  const [showPwSignup, setShowPwSignup] = useState(false);

  return (
    <div>
      <h1 className="font-lora text-[22px] text-[#2C2416] mb-1">Join Focus</h1>
      <p className="text-sm text-[#8B7A63] mb-6">Create your free student account</p>

      <Field label="Email">
        <InputWrap icon={<MailIcon />}>
          <input type="email" placeholder="you@university.edu" className={inputCls} />
        </InputWrap>
      </Field>

      <Field label="Password">
        <InputWrap icon={<LockIcon />}>
          <input type={showPwSignup ? "text" : "password"} placeholder="Min. 8 characters" className={inputCls} />
          <EyeBtn show={showPwSignup} toggle={() => setShowPwSignup((v) => !v)} />
        </InputWrap>
      </Field>

      <label className="flex items-center gap-2 cursor-pointer text-xs text-[#8B7A63] leading-relaxed mb-5">
        <input type="checkbox" className="mt-0.5 accent-[#8B6B3D]" />
        <span>
          I agree to the{" "}
          <a href="#" className="text-[#8B6B3D]">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#8B6B3D]">
            Privacy Policy
          </a>
        </span>
      </label>

      <PrimaryBtn icon={<NotebookIcon />}>Create my account</PrimaryBtn>
      <Divider />
      <GoogleBtn>Sign up with Google</GoogleBtn>

      <p className="text-center text-sm text-[#8B7A63] mt-5">
        Already have an account?{" "}
        <button onClick={() => setTab("signin")} className="text-[#8B6B3D] font-medium hover:underline">
          Sign in
        </button>
      </p>
    </div>
  );
}
