import SideBar from "@/components/SideBar";
import { SessionProvider } from "next-auth/react";
import { AuthGuard } from "./authGuard";
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen h-full w-full flex  text-main bg-[#faf7f2] ">
      <SideBar />
      <div className="text-black  flex-1 px-9 py-8">
        <SessionProvider>
          <AuthGuard>{children}</AuthGuard>
        </SessionProvider>
      </div>
    </div>
  );
}

// add session checks and redirect to signup page
