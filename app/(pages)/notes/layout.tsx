import { NotesSkeleton } from "@/components/skeletons/NotesSkeleton";
import { Suspense } from "react";

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<NotesSkeleton />}>{children}</Suspense>;
}
