"use client";
import { CreateSessionModal } from "@/components/CreateSessionModal";
import FocusTimer from "@/components/FocusTimer";
import { redirect } from "next/navigation";
import { NotesInput } from "@/components/NotesInput";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type SessionData = {
  title: string;
  goal: string;
};

export default function Session() {
  const [open, setOpen] = useState(true);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const router = useRouter();
  const notesRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const storage = localStorage.getItem("session-data");

    if (storage) {
      const data = JSON.parse(storage) as SessionData;
      setSessionData(data);
    } else {
      router.push("/dashboard");
    }
  }, []);

  return (
    <>
      {open ? (
        <CreateSessionModal onCreate={() => setOpen(false)} />
      ) : (
        <>
          <div className="font-serif text-3xl tracking-tight font-light ">{sessionData!.title}</div>
          <div className="text-sm text-main font-medium tracking-tight leading mt-1 ">Focus quietly. Win loudly.</div>

          <div className=" mt-6 max-w-[900px]  ">
            {/* try to replace this mt-8 and find the actual height issue */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4  grid-rows-3">
              {/* Session Main */}
              <div className="w-full bg-foreground p-4 border shadow rounded-2xl border-customBorder h-102  col-span-2 row-span-3 ">
                <div className="p-4 text-center">
                  <FocusTimer ref={notesRef} title={sessionData!.title} goal={sessionData!.goal} />
                </div>
              </div>

              {/* Today Goal */}
              <div className=" w-full h-fit bg-foreground p-5 border   shadow rounded-2xl border-customBorder">
                <div className="uppercase text-main tracking-wider  font-semibold text-xs">today&apos;s goal</div>
                <div className="mt-2 text-sm  bg-[#EAF2EC] text-green-800   p-3 rounded-lg  ">{sessionData!.goal}</div>
              </div>
            </div>

            <div className=" h-60 mt-4  ">
              <div className=" w-full max-w-[37.2rem] bg-foreground p-5 border shadow rounded-2xl border-customBorder h-fit ">
                <div className="uppercase text-main tracking-wider  font-semibold text-sm">session notes</div>
                <NotesInput ref={notesRef} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
