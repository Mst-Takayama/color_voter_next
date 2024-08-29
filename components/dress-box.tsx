import React from "react";
import clsx from "clsx";

import { fontShipporiMincho } from "@/config/fonts";

interface DressBoxProps {
  id: number;
  name: string;
  votedCount: number;
  odds: number;
  imageSrc: string;
  selected: boolean;
  onClick: (id: number) => void;
}

const DressBox: React.FC<DressBoxProps> = ({
  id,
  name,
  votedCount,
  odds,
  imageSrc,
  selected,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        "p-4 cursor-pointer transition-all w-[180px] h-[140px] flex flex-col items-center",
        selected ? "transform scale-110" : "",
        "hover:scale-110",
      )}
      role="button"
      style={{ backgroundImage: `url(${imageSrc})`, backgroundSize: "cover" }}
      tabIndex={0}
      onClick={() => onClick(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick(id);
        }
      }}
    >
      <div
        className={clsx(
          "text-back text-5xl font-normal leading-normal mt-3 mb-[-18px]",
          fontShipporiMincho.className,
        )}
      >
        {name}
      </div>
      <div
        className={clsx(
          "text-back text-[13px] font-normal leading-normal mb-1",
          fontShipporiMincho.className,
        )}
      >
        投票数<span className="text-2xl"> {votedCount}</span>
      </div>
      <div
        className={clsx(
          "text-back text-[13px] font-normal leading-normal mt-[-13px]",
          fontShipporiMincho.className,
        )}
      >
        オッズ<span className="text-2xl"> {odds.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default DressBox;
