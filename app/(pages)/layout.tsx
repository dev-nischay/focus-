import SideBar from "@/components/SideBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen h-full w-full flex  text-main bg-[#faf7f2] ">
      <SideBar />
      <div className="text-black  flex-1 px-9 py-8">{children}</div>
    </div>
  );
}
