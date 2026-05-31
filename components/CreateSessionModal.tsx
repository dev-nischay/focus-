"use client";
import { useEffect, useRef, useState } from "react";

export function CreateSessionModal({ onClose, onCreate }: { onClose: () => void; onCreate: () => void }) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const goalRef = useRef<HTMLInputElement | null>(null);
  const [toggle, setTogle] = useState(false);

  useEffect(() => {
    setTogle(true);
  }, []);

  const handleCreation = () => {
    const title = titleRef.current?.value.trim();
    const goal = goalRef.current?.value.trim();

    if (title && goal) {
      localStorage.setItem("session-data", JSON.stringify({ title, goal }));
      onCreate();
    } else if (!title) {
      titleRef.current?.focus();
    } else {
      goalRef.current?.focus();
    }
  };

  return (
    <div className="h-full  flex items-center justify-center ">
      <div
        className={`bg-[#FFFDF9] border border-[#E8DDD0] rounded-[20px] p-8 w-full max-w-[500px] mx-4   transition-all duration-300 ease-in-out ${toggle ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"} `}
      >
        <div className="w-12 h-12 rounded-[10px] bg-[#F5EFE6] border border-[#E2D5C3] flex items-center justify-center mb-4">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8B6B3D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>

        <p className="text-[25px] font-medium text-[#2C2416] tracking-tight mb-1">Create a session</p>
        <p className="text-[18px] text-[#8B7A63] mb-6">Set up your study space</p>

        <div className="flex flex-col gap-[14px]">
          <div>
            <label
              htmlFor="modal-subject"
              className="block mb-1.5 text-[15px] font-medium text-[#5A4A35] tracking-[0.2px]"
            >
              Session title
            </label>
            <input
              id="modal-subject"
              ref={titleRef}
              type="text"
              placeholder="e.g. Mathematics"
              className="w-full h-[40px] border border-[#D9CCBA] rounded-[10px] bg-[#FBF8F4] px-3 text-[14px] text-[#2C2416] placeholder:text-[#B5A691] outline-none focus:border-[#8B6B3D] focus:bg-[#FFFDF9] transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="modal-goal"
              className="block mb-1.5 text-[15px] font-medium text-[#5A4A35] tracking-[0.2px]"
            >
              Session goal
            </label>
            <input
              id="modal-goal"
              ref={goalRef}
              type="text"
              placeholder="What will you study?"
              className="w-full h-[38px] border border-[#D9CCBA] rounded-[10px] bg-[#FBF8F4] px-3 text-[14px] text-[#2C2416] placeholder:text-[#B5A691] outline-none focus:border-[#8B6B3D] focus:bg-[#FFFDF9] transition-colors"
            />
          </div>
        </div>

        <div className="h-px bg-[#EBE2D4] my-5" />

        <div className=" flex gap-[10px">
          <button
            onClick={handleCreation}
            className="flex-1 h-[50px] cursor-pointer rounded-[10px] bg-[#8B6B3D] text-[14px] font-medium text-[#FBF8F4] hover:bg-[#7A5C32] transition-colors"
          >
            Create &amp; enter
          </button>
        </div>
      </div>
    </div>
  );
}
