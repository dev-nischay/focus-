import SideBar from "@/components/SideBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen h-full w-full flex  text-main bg-[#faf7f2] ">
      <SideBar />
      {children}
    </div>
  );
}
