import { Home, History, Notebook, Timer } from "lucide-react";
import Link from "next/link";
export default async function SideBar() {
  const controls = [
    { title: "Dashboard", url: "dashboard" },
    { title: "My Notes", url: "notes" },
    { title: "My Session", url: "session" },
    { title: "History", url: "history" },
  ];
  const icons = [
    <Home className="size-4 stroke-[1.8]    " />,
    <Notebook className="size-4 stroke-[1.8]" />,
    <Timer className="size-4 stroke-[1.8] " />,
    <History className="size-4 stroke-[1.8] " />,
  ];
  return (
    <div className="flex font-sans  flex-col text-heading w-55 px-5 py-6 justify-between bg-background border-r border-customBorder">
      <div>
        <span className="text-3xl font-serif ">
          <Link href={"/"}>Focus</Link>
        </span>
        <span className="block text-xs mt-1  text-main  ">Stay focused, stay curious</span>
      </div>

      <div className="mt-8 flex-1 ">
        {controls.map((e, index) => (
          <button
            key={index}
            className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] text-sm font-medium text-[#5A4A35] hover:bg-[#EBE2D4] w-full transition-colors "
          >
            <span>{icons[index]}</span>
            <Link href={e.url}>{e.title}</Link>
          </button>
        ))}
      </div>

      <div className="p-1">
        <div className="flex gap-2 pt-4  border-t border-customBorder   ">
          <div className="rounded-full size-9 text-sm bg-[#D4C5A9]  flex justify-center items-center">A</div>
          <div className="">
            <div className="text-heading text-sm pr-1">Alex</div>
            <div className=" text-xs text-main">Year 2 CS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
