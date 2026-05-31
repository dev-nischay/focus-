import { SessionNotes } from "@/prisma/generated/client";
import { X } from "lucide-react";
export const NotesExpanded = ({ note, onClose }: { note: SessionNotes; onClose: () => void }) => {
  const date = new Date(note.createdAt).toString().split(" ");

  return (
    <div>
      <div className="fixed  bg-black/40 flex justify-center items-center z-20 inset-0">
        <div
          className=" [h-64 overflow-auto 
  [&::-webkit-scrollbar]:w-4
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:bg-main
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-clip-padding
    [&::-webkit-scrollbar-thumb]:border-4
    [&::-webkit-scrollbar-thumb]:border-transparent
    hover:[&::-webkit-scrollbar-thumb]:bg-gray-600]    scrollbar  relative w-full h-120 max-w-xl  rounded-4xl border border-customBorder p-6  bg-[#FDFBF7] "
        >
          {/* header */}
          <div className="flex justify-between relative  ">
            <div className="  group  ">
              <button
                onClick={onClose}
                className="  size-9 rounded-lg border bg-background border-customBorder  hover:border-[#d3b98c] cursor-pointer"
              >
                <X className="size-4 text-heading mx-auto" />
              </button>
            </div>
          </div>

          {/* Headings */}
          <div className="text-sm text-main font-medium tracking-tight ml-1 ">
            {date[2]}, {date[1]}
          </div>

          {/* notes  */}
          <p className="pt-2  mt-2 bg-[repeating-linear-gradient(transparent,transparent_27px,#EBE2D4_27px,#EBE2D4_28px)] h-full leading-7">
            {note.content}
          </p>
        </div>
      </div>
    </div>
  );
};
