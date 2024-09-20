"use client";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react"; // Spinnerをインポート
import clsx from "clsx";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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

type Data = {
  id: number;
  name: string;
  voted_count: number;
  odds: number;
  color: string;
};

const ResultsPage = () => {
  const [dress, setDress] = useState<Dress | null>(null);
  const [graphData, setGraphData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true); // ローディング状態の管理
  // idに対応する色を定義
  // 1: 黒, 2: 桃, 3: 水, 4: 翠
  const colors = ["#00000087", "#ef45d556", "#6ef5f57d", "#4efd4e82"];

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

        // dressesのデータをグラフ用のデータに変換
        setGraphData(
          data.dresses.map((dress: Data) => ({
            ...dress,
            color: colors[dress.id - 1],
          })),
        );
      } catch (error) {
        window.location.href = "/";
      } finally {
        setLoading(false); // データフェッチが終わったらローディング状態を終了
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" /> {/* ローディング中にスピナーを表示 */}
      </div>
    );
  }

  if (!dress) {
    return <div>データがありません</div>; // ドレスのデータがない場合
  }

  return (
    <div className="relative max-w-screen-sm mx-auto">
      <div className="absolute top-0 right-0 w-[50%] h-[45%] bg-[#f2f2f2] z-0" />
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
        <div
          className={clsx(
            "text-black text-2xl font-normal leading-normal tracking-widest mt-16",
            fontShipporiMincho.className,
          )}
        >
          <p>現在の投票結果</p>
        </div>
        <ResponsiveContainer height={200} width="100%">
          <PieChart>
            <Pie
              label
              cx="50%"
              cy="80%"
              data={graphData}
              dataKey="voted_count"
              endAngle={180}
              nameKey="name"
              outerRadius={110}
              startAngle={0}
            >
              {graphData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultsPage;
