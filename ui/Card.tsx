export const CardSmall = () => {
  return (
    <div className=" w-full h-fit bg-foreground p-4 border   shadow rounded-2xl border-customBorder  ">
      <div className="text-center flex flex-col gap-2 text-main">
        <div className="text-xs">TODAY</div>
        <div className="text-2xl text-green-800 font-medium">
          2h <span className="pl-2">19m</span>
        </div>
        <div className="text-xs ">studied today</div>
      </div>
    </div>
  );
};

export const CardLarge = () => {
  return <div className={` w-full bg-foreground p-4 border shadow rounded-2xl border-customBorder h-100  `}></div>;
};
