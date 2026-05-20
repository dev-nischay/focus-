"use client";
import { useState, useEffect, useCallback, useRef } from "react";
export function FocusTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function formatElapsed(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startInterval = useCallback(() => {
    stopInterval();
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
  }, [stopInterval]);

  useEffect(() => {
    return () => stopInterval();
  }, [stopInterval]);

  const handleToggleSession = () => {
    if (isRunning) {
      stopInterval();
      setIsRunning(false);
      return;
    }

    setElapsed(0);
    startInterval();
    setIsRunning(true);
  };
  return (
    <div className="p-4 text-center">
      <div className="uppercase text-main tracking-wider  font-semibold text-xs">
        {isRunning ? "session in progress" : "ready to focus?"}
      </div>

      {/* Session Timer */}
      <div className="flex justify-center items-center">
        <div className="size-60 flex items-center justify-center bg-background rounded-full border-2 border-customBorder mt-4">
          <div className="text-5xl text-heading tabular-nums">{formatElapsed(elapsed)}</div>
        </div>
      </div>
      <button
        onClick={handleToggleSession}
        className="mt-6 bg-green-800 text-white font-bold rounded-lg px-6 py-3 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      >
        {isRunning ? "End Session" : "Start Session"}
      </button>
    </div>
  );
}

export default FocusTimer;
