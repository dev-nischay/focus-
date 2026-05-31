import { NotesMain } from "@/components/NotesMain";
import { cookies, headers } from "next/headers";
export default async function NotesPage() {
  const cookieStore = await cookies();

  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${protocol}://${host}/api/notes`, {
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const response = await res.json();

  return <NotesMain notesArr={response.data} />;
}
