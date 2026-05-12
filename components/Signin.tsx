"use client";
import { Field, InputWrap } from "@/ui/InputWrap";
import { MailIcon, LockIcon, ArrowIcon } from "@/ui/icons/icons";
import { EyeBtn } from "@/ui/EyeToggleBtn";
import { PrimaryBtn } from "./Button";
import { Divider } from "@/ui/Divider";
import { useState } from "react";
import { GoogleBtn } from "./Button";
import { Dispatch, SetStateAction } from "react";
export function SignIn({ setTab }: { setTab: Dispatch<SetStateAction<"signin" | "signup">> }) {
  const [showPwLogin, setShowPwLogin] = useState(false);
  const inputCls = "w-full bg-transparent border-0 outline-none text-sm text-[#2C2416] placeholder-[#B0A090] pr-10";

  return (
    <div>
      <h1 className="font-sans text-[22px] text-[#2C2416] mb-1">Welcome back</h1>
      <p className="text-sm text-[#8B7A63] mb-6">Pick up right where you left off</p>

      <Field label="Email">
        <InputWrap icon={<MailIcon />}>
          <input type="email" placeholder="you@university.edu" className={inputCls} />
        </InputWrap>
      </Field>

      <Field label="Password">
        <InputWrap icon={<LockIcon />}>
          <input type={showPwLogin ? "text" : "password"} id="pw-login" placeholder="••••••••" className={inputCls} />
          <EyeBtn show={showPwLogin} toggle={() => setShowPwLogin((v) => !v)} />
        </InputWrap>
      </Field>

      <button className="text-xs text-[#8B6B3D] hover:underline block text-right mb-5 -mt-2">Forgot password?</button>

      <PrimaryBtn icon={<ArrowIcon />}>Sign in to Focus</PrimaryBtn>
      <Divider />
      <GoogleBtn>Continue with Google</GoogleBtn>

      <p className="text-center text-sm text-[#8B7A63] mt-5">
        New here?{" "}
        <button onClick={() => setTab("signup")} className="text-[#8B6B3D] font-medium hover:underline">
          Create a free account
        </button>
      </p>
    </div>
  );
}
