export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-[#5A4A35] mb-1.5 tracking-wide">{label}</label>
      {children}
    </div>
  );
}

export function InputWrap({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="relative  flex items-center bg-[#F3EDE3] border border-[#D4C5A9] rounded-[10px] px-3 py-2.5 focus-within:border-[#8B6B3D] focus-within:bg-[#FAF7F2] transition-all">
      <span className="text-[#A89880] mr-2 shrink-0 w-4 h-4">{icon}</span>
      {children}
    </div>
  );
}
