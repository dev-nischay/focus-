import { Auth } from "@/components/Auth";
export default async function AuthPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 ">
      <div className="w-full max-w-5xl grid  grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-[#E0D4C0] shadow-md xl:max-w-5xl ">
        {/* ── Left panel ── */}
        <div className="relative bg-[#EBE2D4] p-12 flex flex-col justify-between overflow-hidden">
          {/* decorative circles */}
          <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-[#D4C5A9] opacity-50 pointer-events-none" />
          <div className="absolute -bottom-16 -left-8 w-64 h-64 rounded-full bg-[#D4C5A9] opacity-35 pointer-events-none" />

          {/* Brand */}
          <div className="relative z-10">
            <p className="font-sans text-2xl font-semibold text-[#3C2A14]">Focus</p>
            <p className="text-sm text-[#8B7A63] mt-1">Stay focused, stay curious</p>
          </div>

          {/* Quote */}
          <div className="relative z-10">
            <p className="font-sans text-6xl text-[#C4A882] leading-none mb-[-8px]">"</p>
            <p className="font-sans italic text-[17px] text-[#4A3520] leading-relaxed mb-4">
              A focused hour is worth more than a distracted day. Show up, sit down, and begin.
            </p>
            <p className="text-xs text-[#8B7A63] font-medium tracking-widest uppercase">— study wisdom</p>
          </div>

          {/* Stats */}
          <div className="relative z-10 flex gap-4">
            {[
              { num: "2.4k", lbl: "Students" },
              { num: "18k", lbl: "Hours logged" },
              { num: "340", lbl: "Active rooms" },
            ].map((s) => (
              <div key={s.lbl} className="bg-white/80 rounded-xl px-5 py-2 text-center ">
                <p className="text-lg font-semibold text-[#5C4323]">{s.num}</p>
                <p className="text-[11px] text-[#8B7A63] mt-0.5">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel ── */}
        <Auth />
      </div>
    </main>
  );
}
