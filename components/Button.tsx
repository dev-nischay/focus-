import { GoogleLogo } from "@/ui/icons/icons";
import { ButtonHTMLAttributes } from "react";
type PrimaryButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  icon?: React.ReactNode;
};

export function PrimaryBtn({ children, icon, className = "", ...props }: PrimaryButton) {
  return (
    <button
      {...props}
      className={`w-full flex items-center justify-center gap-2 bg-[#8B6B3D] hover:bg-[#5C4323] text-white text-sm font-medium rounded-[10px] py-3 transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 mb-4  ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

export function GoogleBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-[#F3EDE3] border border-[#D4C5A9] text-[#5A4A35] text-sm font-medium rounded-[10px] py-3 transition-colors">
      <GoogleLogo />
      {children}
    </button>
  );
}
