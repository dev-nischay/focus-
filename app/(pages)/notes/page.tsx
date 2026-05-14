"use client";
import { useState } from "react";
import { Fullscreen, X } from "lucide-react";
export default function NotesPage() {
  const [toggle, setToggle] = useState(false);
  const [preview, setPreview] = useState(true);
  const [readingNote, setReadingNote] = useState<{
    bgColor: string;
    title: string;
    icon: string;
    date: string;
    content: string;
    id: number;
    isPinned: boolean;
  } | null>(null);
  const notes = [
    {
      id: 1,
      title: "Project Planning",
      content: "Finalize the dashboard layout and API structure for the upcoming sprint.",
      isPinned: true,
      icon: "📌",
      date: "Aug 10",
      bgColor: "bg-mist-500",
    },
    {
      id: 2,
      title: "React Revision",
      content: "Review hooks, state management, and component composition patterns.",
      isPinned: true,
      icon: "⚛️",
      date: "Aug 12",
      bgColor: "bg-purple-900",
    },
    {
      id: 3,
      title: "Workout Routine",
      content: "Complete chest and shoulder workout before 7 PM.",
      isPinned: false,
      icon: "🏋️",
      date: "Aug 14",
      bgColor: "bg-yellow-600",
    },
    {
      id: 4,

      title: "Meeting Notes",
      content: "Discuss authentication flow and database schema updates.",
      isPinned: false,
      icon: "📝",
      date: "Aug 15",
      bgColor: "bg-mauve-500",
    },
    {
      id: 5,
      title: "UI Improvements",
      content: "Improve spacing and typography consistency across the app.",
      isPinned: false,
      icon: "🎨",
      date: "Aug 16",
      bgColor: "bg-main",
    },
    {
      id: 6,
      title: "Backend Tasks",
      content: "Implement pagination and filtering for notes endpoint.",
      isPinned: false,
      icon: "🛠️",
      date: "Aug 17",
      bgColor: "bg-blue-800",
    },
    {
      id: 7,
      title: "Ideas",
      content: "Build a habit tracker with analytics and streak system.",
      isPinned: false,
      icon: "💡",
      date: "Aug 18",
      bgColor: "bg-yellow-600",
    },
    {
      id: 8,
      title: "Shopping List",
      content: "Buy keyboard cleaner, notebook, and USB-C adapter.",
      isPinned: false,
      icon: "🛒",
      date: "Aug 19",
      bgColor: "bg-main",
    },
    {
      id: 9,
      title: "Reading",
      content: "Finish reading about caching strategies in distributed systems.",
      isPinned: false,
      icon: "📚",
      date: "Aug 20",
      bgColor: "bg-blue-800",
    },
    {
      id: 10,
      title: "Daily Reflection",
      content: "Track progress made during the frontend marathon.",
      isPinned: false,
      icon: "🌙",
      date: "Aug 21",
      bgColor: "bg-stone-500",
    },
    {
      id: 11,
      title: "Finnaly Completed",
      content:
        "we are finnaly completed i cant believe this i hope our card content handles the full text and dose'nt flinch let see how this works everything else should work fine",
      isPinned: true,
      icon: "👨‍🎨",
      date: "Aug 21",
      bgColor: "bg-stone-500",
    },
  ];

  const pinnedNotes = notes.filter((e) => e.isPinned);
  const otherNotes = notes.filter((e) => !e.isPinned);

  const triggerPreivew = (note: {
    bgColor: string;
    title: string;
    icon: string;
    date: string;
    content: string;
    id: number;
    isPinned: boolean;
  }) => {
    setPreview(true);
    setReadingNote(note);
  };
  return (
    <>
      <div className="font-serif text-3xl tracking-tight font-light">My Notes</div>
      <div className="text-sm text-main font-medium tracking-tight ml-1 leading mt-1  ">14 notes 2 pinned</div>

      {preview && readingNote && <NotePreview note={readingNote} onClose={() => setPreview(false)} />}

      {/* Notes Search */}
      <div className=" w-full mt-6 flex gap-4 items-center  ">
        <input
          type="text"
          className="outline-0 text-sm pl-5 p-1    max-w-2xs h-10 bg-background    w-full  border rounded-lg border-customBorder focus:border-[#d3b98c] "
          placeholder="Search notes..."
        />

        {/* Toggle Notes Preiview */}
        <div className="relative group ">
          <button
            onClick={() => setToggle((prev) => !prev)}
            className="  size-9 rounded-lg border bg-background border-customBorder  hover:border-[#d3b98c] cursor-pointer"
          >
            <Fullscreen className="size-4 text-heading mx-auto" />
          </button>
          <div className="absolute -top-12 left-2 opacity-0 group-hover:opacity-100  text-xs  py-1 px-2 rounded-lg text-center border border-customBorder  text-black bg-foreground  transition-all duraiton-150 ">
            toggle preview
          </div>
        </div>
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

const NoteCard = ({
  note,
  triggerPreview,
  toggle,
}: {
  note: { bgColor: string; title: string; icon: string; date: string; content: string; id: number; isPinned: boolean };
  triggerPreview: (note: {
    bgColor: string;
    title: string;
    icon: string;
    date: string;
    content: string;
    id: number;
    isPinned: boolean;
  }) => void;
  toggle: boolean;
}) => {
  return (
    <div
      onClick={() => triggerPreview(note)}
      className="bg-foreground   rounded-xl border border-customBorder shadow-sm overflow-hidden flex flex-col p-5  hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer "
    >
      <div className={`h-1  -mt-5 -mx-5  mb-1   ${note.bgColor}`} />
      {toggle ? (
        <div className="flex justify-between items-center mt-1">
          <div className="flex gap-5 items-center ">
            <div>{note.icon}</div>
            <div className="flex flex-col   ">
              <h3 className="font-bold text-stone-800 text-md ">{note.title}</h3>
              <p className="text-main text-sm line-clamp-1   leading-relaxed">{note.content}</p>
            </div>
          </div>
          <div className="text-xs text-main uppercase tracking-widest font-semibold text-end">{note.date}</div>
        </div>
      ) : (
        <div>
          <div className={`h-1  -mt-5 -mx-5   mb-5 ${note.bgColor}`} />
          <div className="text-lg mb-2">{note.icon}</div>
          <h3 className="font-bold text-stone-800 text-lg mb-2 ">{note.title}</h3>

          <p className="text-main text-sm line-clamp-3 grow leading-relaxed">{note.content}</p>

          <div className="mt-6 flex justify-between items-center border-t border-customBorder pt-3">
            <span className="text-xs text-main uppercase tracking-widest font-semibold text-end">{note.date}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const NotePreview = ({
  note,
  onClose,
}: {
  note: { id: number; title: string; content: string; isPinned: boolean; icon: string; date: string; bgColor: string };
  onClose: () => void;
}) => {
  return (
    <div>
      <div className="fixed bg-black/40 flex justify-center items-center z-20 inset-0">
        <div className=" relative w-full h-120 max-w-xl  rounded-4xl border border-customBorder p-6  bg-[#FDFBF7] overflow-auto">
          {/* header */}
          <div className="flex justify-between relative  ">
            <div>{note.icon}</div>
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
          <h3 className="font-bold text-stone-800 text-lg  ">{note.title}</h3>
          <div className="text-sm text-main font-medium tracking-tight ml-1 ">{note.date}</div>

          {/* notes  */}
          <p className="pt-2  mt-2 bg-[repeating-linear-gradient(transparent,transparent_27px,#EBE2D4_27px,#EBE2D4_28px)] h-full leading-7">
            {note.content}
          </p>
        </div>
      </div>
    </div>
  );
};
