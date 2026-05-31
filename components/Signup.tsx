"use client";
import { ApiError, ApiResponse } from "@/types/response.types";
import { MailIcon, LockIcon, NotebookIcon } from "@/ui/icons/icons";
import { EyeBtn } from "@/ui/EyeToggleBtn";
import { PrimaryBtn } from "./Button";
import { Divider } from "@/ui/Divider";
import { useRef, useState } from "react";
import { GoogleBtn } from "./Button";
import { Field, InputWrap } from "@/ui/InputWrap";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import axios from "axios";
export function SignUp({ setTab }: { setTab: Dispatch<SetStateAction<"signin" | "signup">> }) {
  const router = useRouter();
  const inputCls = "w-full bg-transparent border-0 outline-none text-sm text-[#2C2416] placeholder-[#B0A090] pr-10";
  const [showPwSignup, setShowPwSignup] = useState(false);
  const [notifi, setNotifi] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState("");
  const handleSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!password) {
      setError("password cannot be empty");
      return;
    }

    if (!email) {
      setError("email cannot be empty");
      return;
    }

    const creds = {
      email,
      password,
    };
    try {
      const res = await axios.post("http://localhost:3000/api/signup", { ...creds });
      setNotifi(true);
      emailRef.current!.value = "";
      passwordRef.current!.value = "";
      return;
    } catch (error) {
      //@ts-ignore
      setError(err.response?.data.error);
    }
  };

  return (
    <div>
      <h1 className="font-sans text-[22px] text-[#2C2416] mb-1">Join Focus</h1>
      <p className="text-sm text-[#8B7A63] mb-15">Create your free student account</p>

      <Notifi notifi={notifi} />
      <div className="relative">
        {error.length > 0 && <div className="border border-red-500 text-red-500 w-fit px-4 py-2 mx-auto ">{error}</div>}
        <Field label="Email">
          <InputWrap icon={<MailIcon />}>
            <input type="email" ref={emailRef} placeholder="you@university.edu" className={inputCls} />
          </InputWrap>
        </Field>

        <Field label="Password">
          <InputWrap icon={<LockIcon />}>
            <input
              type={showPwSignup ? "text" : "password"}
              ref={passwordRef}
              placeholder="Min. 8 characters"
              className={inputCls}
            />
            <EyeBtn show={showPwSignup} toggle={() => setShowPwSignup((v) => !v)} />
          </InputWrap>
        </Field>
      </div>

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

      <PrimaryBtn onClick={handleSubmit} icon={<NotebookIcon />}>
        Create my account
      </PrimaryBtn>

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

export const Notifi = ({ notifi }: { notifi: boolean }) => {
  return (
    <div
      className={`fixed top-0 right-5 translate-y-0  flex justify-center items-center  bg-background border border-customBorder w-50 h-12 rounded-xl font-semibold text-main text-sm ${notifi ? "translate-y-3 opacity-100" : "translate-y-0 opacity-0"} transition-all duration-200 `}
    >
      Account Created !
    </div>
  );
};
