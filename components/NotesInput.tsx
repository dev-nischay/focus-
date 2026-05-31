import { forwardRef } from "react";
export const NotesInput = forwardRef<HTMLTextAreaElement>((props, ref) => {
  return (
    <textarea
      ref={ref}
      className="overflow-auto  h-40  outline-0 p-2 tracking-tight resize-none w-full  bg-background rounded-lg border border-customBorder   mt-4"
      placeholder="What are you working on today?"
    ></textarea>
  );
});
