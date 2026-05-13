import { CardList, CardSmall } from "../dashboard/page";

export default function History() {
  const dropDownVals = ["All time", "This week", "This month"];

  return (
    <div className="text-black  flex-1 px-9 py-8">
      <div className="font-serif text-3xl tracking-tight font-light">Session History</div>
      <div className="text-sm text-main font-medium tracking-tight leading mt-1 ">Every session counts</div>

      <div className=" mt-8 max-w-[900px] ">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSmall />
          <CardSmall />
          <CardSmall />
        </div>

        <div className="grid grid-cols-1 h-screen bg-foreground mt-8 relative  border shadow rounded-xl border-customBorder   ">
          <div className="border-b absolute border-customBorder inset-x-0 top-16"></div>
          <div className="h-full w-full p-5 ">
            {/* header */}
            <div className=" flex justify-between  items-center w-full   mb-10  ">
              <div className="text-sm  font-medium text-main  uppercase  border-customBorder">all sessions</div>
              <div>
                <select
                  id="cars"
                  className="text-xs font-medium text-black border border-taupe-700 px-2 py-2 bg-background  rounded-lg  "
                >
                  {dropDownVals.map((e, index) => {
                    return (
                      <option key={index} value={e}>
                        {e}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* history list */}
            <div>df</div>
          </div>
        </div>
      </div>
    </div>
  );
}
