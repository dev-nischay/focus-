"use client";
import { SessionNotes } from "@/prisma/generated/client";
import { Fullscreen } from "lucide-react";
import { NotesExpanded } from "./NotesExpanded";
import { useState } from "react";
import { NoteCard } from "./NotesCard";
export function NotesMain({ notesArr }: { notesArr: SessionNotes[] }) {
  const [toggle, setToggle] = useState(false);
  const [preview, setPreview] = useState(true);
  const [readingNote, setReadingNote] = useState<SessionNotes | null>(null);
  const [notes, setNotes] = useState(notesArr);

  const pinnedNotes = notes.filter((e) => e.isPinned);
  const otherNotes = notes.filter((e) => !e.isPinned);

  const triggerPreivew = (note: SessionNotes) => {
    setPreview(true);
    setReadingNote(note);
  };
  return (
    <>
      <div className="font-serif text-3xl tracking-tight font-light">My Notes</div>
      <div className="text-sm text-main font-medium tracking-tight ml-1 leading mt-1  ">14 notes 2 pinned</div>

      {preview && readingNote && <NotesExpanded note={readingNote} onClose={() => setPreview(false)} />}

      {/* Notes Search */}
      <div className=" w-full mt-6 flex gap-4 items-center  ">
        <input
          type="text"
          className="outline-0 text-sm pl-5 p-1    max-w-2xs h-10 bg-background    w-full  border rounded-lg border-customBorder focus:border-[#d3b98c] "
          placeholder="Search notes..."
        />

        {/* Toggle Notes Preiview */}
        <TogglePreview onToggle={() => setToggle((prev) => !prev)} />
      </div>

      <div className="max-w-[900px] mt-4 ">
        {/* Pinned Notes */}

        <div className="text-sm font-medium text-main  tracking-wide uppercase">pinned</div>
        <div
          className={`grid grid-cols-1  gap-4 mt-4 ${toggle ? "md:grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"} transition-all duraiton-200`}
        >
          {pinnedNotes.map((e, index) => (
            <NoteCard key={index} note={e} triggerPreview={triggerPreivew} toggle={toggle} />
          ))}
        </div>

        <div className="mt-6">
          {/* other  Notes */}

          <div className="text-sm font-medium text-main  tracking-wide uppercase">all notes</div>
          <div
            className={`grid grid-cols-1  gap-4 mt-4 ${toggle ? "md:grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  "} transition-all duraiton-200`}
          >
            {otherNotes.map((e, index) => (
              <NoteCard key={index} note={e} triggerPreview={triggerPreivew} toggle={toggle} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const TogglePreview = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <div className="relative group ">
      <button
        onClick={onToggle}
        className="  size-9 rounded-lg border bg-background border-customBorder  hover:border-[#d3b98c] cursor-pointer"
      >
        <Fullscreen className="size-4 text-heading mx-auto" />
      </button>
      <div className="absolute -top-12 left-2 opacity-0 group-hover:opacity-100  text-xs  py-1 px-2 rounded-lg text-center border border-customBorder  text-black bg-foreground  transition-all duraiton-150 ">
        toggle preview
      </div>
    </div>
  );
};
