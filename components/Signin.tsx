"use client";
import { Field, InputWrap } from "@/ui/InputWrap";
import { MailIcon, LockIcon, ArrowIcon } from "@/ui/icons/icons";
import { EyeBtn } from "@/ui/EyeToggleBtn";
import { PrimaryBtn } from "./Button";
import { Divider } from "@/ui/Divider";
import { useState } from "react";
import { GoogleBtn } from "./Button";
import { Dispatch, SetStateAction } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export function SignIn({ setTab }: { setTab: Dispatch<SetStateAction<"signin" | "signup">> }) {
  const [showPwLogin, setShowPwLogin] = useState(false);
  const inputCls = "w-full bg-transparent border-0 outline-none text-sm text-[#2C2416] placeholder-[#B0A090] pr-10";

  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
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

    const res = await signIn("credentials", {
      ...creds,
      redirect: false,
    });

    if (res?.error) {
      let statusCode = res.status;
      let error = "";

      switch (statusCode) {
        case 401:
          error = "user not found ";
          break;

        case 500:
          error = "something went wrong";
          break;
      }

      setError(error);
    } else {
      router.push("/session");
    }
  };
  return (
    <div>
      <h1 className="font-sans text-[22px] text-[#2C2416] ">Welcome back</h1>
      <p className="text-sm text-[#8B7A63] mb-15">Pick up right where you left off</p>

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
              type={showPwLogin ? "text" : "password"}
              ref={passwordRef}
              id="pw-login"
              placeholder="••••••••"
              className={inputCls}
            />
            <EyeBtn show={showPwLogin} toggle={() => setShowPwLogin((v) => !v)} />
          </InputWrap>
        </Field>
      </div>
      <button className="text-xs text-[#8B6B3D] hover:underline block text-right mb-5 -mt-2">Forgot password?</button>

      <PrimaryBtn onClick={handleSubmit} icon={<ArrowIcon />}>
        Sign in to Focus
      </PrimaryBtn>
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
