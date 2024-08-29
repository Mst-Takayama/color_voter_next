import { useEffect, useState } from "react";
import clsx from "clsx";

import { fontShipporiMincho } from "@/config/fonts";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    // ターゲット日時を日本時間 (JST) で設定
    const targetDate = new Date("2024-09-29T15:00:00+09:00"); // 2024年9月29日 15:00 JST
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    // クライアントがマウントされるまで何も表示しない
    return null;
  }

  return (
    <div>
      {timeLeft.days !== undefined ? (
        <div className="flex flex-col">
          <h1
            className={clsx(
              "text-black text-2xl font-normal leading-tight mx-auto",
              fontShipporiMincho.className,
            )}
          >
            投票受付時間
          </h1>
          <div className="time flex mt-7 justify-between">
            <div
              className={clsx(
                "text-black text-xl font-normal leading-tight flex items-end pb-1 pr-2",
                fontShipporiMincho.className,
              )}
            >
              残り
            </div>
            <div
              className={clsx(
                "text-black text-4xl font-normal leading-tight",
                fontShipporiMincho.className,
              )}
            >
              {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
          </div>
        </div>
      ) : (
        <div>イベントは終了しました</div>
      )}
    </div>
  );
};

export default CountdownTimer;
