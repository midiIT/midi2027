"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string;
  labels: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference % 86400000) / 3600000),
    minutes: Math.floor((difference % 3600000) / 60000),
    seconds: Math.floor((difference % 60000) / 1000),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function TimeUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="text-center">
      <div
        className="
          text-[clamp(56px,9vw,112px)]
          font-extrabold
          leading-none
          tracking-[-0.03em]
          text-white
        "
      >
        {pad(value)}
      </div>

      <div
        className="
          mt-2
          text-xs
          font-semibold
          uppercase
          tracking-[0.2em]
          text-white/50
        "
      >
        {label}
      </div>
    </div>
  );
}

export function Countdown({
  targetDate,
  labels,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function updateCountdown() {
      setTimeLeft(calculateTimeLeft(targetDate));
    }

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div
      className="
        flex
        flex-wrap
        items-start
        justify-center
        gap-[clamp(16px,4vw,48px)]
      "
    >
      <TimeUnit
        value={timeLeft.days}
        label={labels.days}
      />

      <span className="pt-1.5 text-[clamp(40px,6vw,80px)] font-extrabold leading-none text-white/20">
        :
      </span>

      <TimeUnit
        value={timeLeft.hours}
        label={labels.hours}
      />

      <span className="pt-1.5 text-[clamp(40px,6vw,80px)] font-extrabold leading-none text-white/20">
        :
      </span>

      <TimeUnit
        value={timeLeft.minutes}
        label={labels.minutes}
      />

      <span className="pt-1.5 text-[clamp(40px,6vw,80px)] font-extrabold leading-none text-white/20">
        :
      </span>

      <TimeUnit
        value={timeLeft.seconds}
        label={labels.seconds}
      />
    </div>
  );
}