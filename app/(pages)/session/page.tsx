import FocusTimer from "@/components/FocusTimer";

export default async function SessionPage() {
  return (
    <>
      <div className="font-serif text-3xl tracking-tight font-light">My Session</div>
      <div className="text-sm text-main font-medium tracking-tight leading mt-1 ">Focus quietly. Win loudly.</div>

      <div className=" mt-8 max-w-[900px]  ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  grid-rows-3">
          {/* Session Main */}
          <div className="w-full bg-foreground p-4 border shadow rounded-2xl border-customBorder h-100 col-span-2 row-span-3 ">
            <div className="p-4 text-center">
              <FocusTimer />
            </div>
          </div>

          {/* Today Goal */}
          <div className=" w-full h-fit bg-foreground p-5 border   shadow rounded-2xl border-customBorder">
            <div className="uppercase text-main tracking-wider  font-semibold text-xs">today&apos;s goal</div>
            <div className="mt-2 text-sm  bg-[#EAF2EC] text-green-800   p-3 rounded-lg  ">
              Complete practise problems for midterm review
            </div>
          </div>

          <div className="row-span-2">
            <div className="h-63 bg-foreground rounded-xl border shadow border-customBorder  p-1 ">
              <div className="text-center">figure out </div>
            </div>
          </div>
        </div>

        {/* Session Notes */}
        <div className=" h-60  ">
          <div className=" w-full max-w-[37.2rem] bg-foreground p-5 border shadow rounded-2xl border-customBorder h-fit ">
            <div className="uppercase text-main tracking-wider  font-semibold text-sm">session notes</div>
            <textarea
              className="overflow-auto  h-40  outline-0 p-2 tracking-tight resize-none w-full  bg-background rounded-lg border border-customBorder   mt-4"
              placeholder="What are you working on today?"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}
