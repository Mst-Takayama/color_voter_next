"use client";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react"; // Spinnerをインポート
import clsx from "clsx";

// DressBoxコンポーネントをインポート
import { apiFetch } from "@/components/api"; // APIフェッチ用の関数をインポート
import { fontShipporiMincho } from "@/config/fonts";

// dressの型を定義
type User = {
  user_name: string;
};

const LotteryPage = () => {
  const [winner, setWinner] = useState<String | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true); // ローディング状態の管理

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await apiFetch("/lotteries"); // APIから結果を取得

        setWinner(data.winner);

        setUsers(
          data.correct_votes.map((user: User) => ({
            ...user,
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

  if (!winner || !users) {
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
          <p>当選者は</p>
          <p className="mt-4">{winner}さん</p>
        </div>
        <div className="mt-4">
          <p
            className={clsx(
              "text-black text-2xl font-normal leading-normal tracking-widest",
              fontShipporiMincho.className,
            )}
          >
            正解者は
          </p>
          <ul className="mt-4">
            {users.map((user) => (
              <li key={user.user_name}>{user.user_name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LotteryPage;
