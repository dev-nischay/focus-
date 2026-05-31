import { HistorySkeleton } from "@/components/skeletons/HistorySkeleton";
import { Suspense } from "react";
import HistoryPage from "./page";
export default function HistoryLayout() {
  return (
    <Suspense fallback={<HistorySkeleton />}>
      <HistoryPage />
    </Suspense>
  );
}
