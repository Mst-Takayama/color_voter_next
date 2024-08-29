"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

import DressBox from "@/components/dress-box"; // DressBoxコンポーネントをインポート
import { apiFetch } from "@/components/api"; // APIフェッチ用の関数をインポート
import { fontShipporiMincho } from "@/config/fonts";

// dressの型を定義
type Dress = {
  id: number;
  name: string;
  voted_count: number;
  odds: number;
  imageSrc: string;
};

const ResultsPage = () => {
  const [dress, setDress] = useState<Dress | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await apiFetch("/votes/result"); // APIから結果を取得

        setDress({
          id: data.id,
          name: data.voted_dress,
          voted_count: data.voted_count,
          odds: data.odds,
          imageSrc: `/${data.voted_dress}.svg`, // SVGの画像パスを設定
        });
      } catch (error) {
        window.location.href = "/";
      }
    };

    fetchResults();
  }, []);

  if (!dress) {
    return <div>Loading...</div>; // データがロードされるまでローディング表示
  }

  return (
    <div className="relative max-w-screen-sm mx-auto">
      <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-[#f2f2f2] z-0" />
      <div className="p-4 relative z-10 flex justify-center flex-col items-center">
        <div
          className={clsx(
            "text-black text-2xl font-normal leading-normal tracking-widest",
            fontShipporiMincho.className,
          )}
        >
          <p>あなたの</p>
          <p>選んだ色は</p>
        </div>
        <div className="mt-4">
          <DressBox
            id={dress.id}
            imageSrc={dress.imageSrc}
            name={dress.name}
            odds={dress.odds}
            selected={false} // 結果ページなので選択状態は関係なし
            votedCount={dress.voted_count}
            onClick={() => {}} // onClickは無効化
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
