import { EyeIcon, EyeOffIcon } from "./icons/icons";

export function EyeBtn({ show, toggle }: { show: boolean; toggle: () => void }) {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle password visibility"
      className="absolute right-3 text-[#A89880] hover:text-[#5A4A35] transition-colors "
    >
      {show ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );
}
