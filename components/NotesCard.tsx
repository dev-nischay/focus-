import { SessionNotes } from "@/prisma/generated/client";
import { randomColour } from "@/utils/randomColour";
export const NoteCard = ({
  note,
  triggerPreview,
  toggle,
}: {
  note: SessionNotes;
  triggerPreview: (note: SessionNotes) => void;
  toggle: boolean;
}) => {
  const bgColour = randomColour();
  const date = new Date(note.createdAt).toString().split(" ");

  return (
    <div
      onClick={() => triggerPreview(note)}
      className="bg-foreground   rounded-xl border border-customBorder shadow-sm overflow-hidden flex flex-col p-5  hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer "
    >
      <div className={`h-1  -mt-5 -mx-5  mb-1   ${bgColour}`} />
      {toggle ? (
        <div className="flex justify-between items-center mt-1">
          <div className="gap-5 items-center ">
            <div className="flex flex-col   ">
              <p className="text-main text-sm line-clamp-1   leading-relaxed">{note.content}</p>
            </div>
          </div>
          <div className="text-xs text-main uppercase tracking-widest font-semibold text-end">
            {date[2]} , {date[1]}
          </div>
        </div>
      ) : (
        <div>
          <div className={`h-1  -mt-5 -mx-5   mb-5 ${bgColour}`} />
          <p className="text-main text-sm line-clamp-3 grow leading-relaxed pt-4">{note.content}</p>

          <div className="mt-6 flex justify-between items-center border-t border-customBorder pt-3">
            <span className="text-xs text-main uppercase tracking-widest font-semibold text-end">
              {date[2]} , {date[1]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
