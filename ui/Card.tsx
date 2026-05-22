import { minToHours } from "@/utils/timeCals";

export const CardSmall = ({
  mins,
  title,
  context,
  singleVal,
}: {
  mins?: number;
  title: string;
  context: string;
  singleVal?: number | undefined;
}) => {
  function DurationValue({ mins }: { mins: number }) {
    const { hours, minutes } = minToHours(mins);
    return (
      <span className="pl-2">
        {hours}h {minutes}m
      </span>
    );
  }

  return (
    <div className=" w-full h-fit bg-foreground p-4 border   shadow rounded-2xl border-customBorder  ">
      <div className="text-center flex flex-col gap-2 text-main">
        <div className="text-xs">{title}</div>
        <div className="text-2xl text-green-800 font-medium">
          {singleVal ? <span>{singleVal}</span> : mins ? <DurationValue mins={mins} /> : <span></span>}
        </div>
        <div className="text-xs ">{context}</div>
      </div>
    </div>
  );
};

export const CardLarge = () => {
  return <div className={` w-full bg-foreground p-4 border shadow rounded-2xl border-customBorder h-100  `}></div>;
};
