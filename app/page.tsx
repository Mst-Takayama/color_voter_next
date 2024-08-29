"use client";

import { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { clsx } from "clsx";
import { v4 as uuidv4 } from "uuid";

import { apiFetch } from "../components/api";
import DressBox from "../components/dress-box"; // DressBoxをインポート

import { fontRobotoSerif, fontShipporiMincho } from "@/config/fonts";
import CountdownTimer from "@/components/countdown-timer";

const VotePage = () => {
  const [name, setName] = useState("");
  const [selectedDressId, setSelectedDressId] = useState<number | null>(null);
  const [dresses, setDresses] = useState<
    Array<{
      id: number;
      name: string;
      voted_count: number;
      odds: number;
      imageSrc: string;
    }>
  >([]);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const data = await apiFetch("/votes/new");

        setDresses(
          data.map(
            (dress: {
              id: number;
              name: string;
              voted_count: number;
              odds: number;
            }) => ({
              ...dress,
              imageSrc: `/${dress.name}.svg`, // 画像パスを適宜設定
            }),
          ),
        );
      } catch (error) {
        window.location.href = "/result";
      }
    };

    fetchDresses();
  }, []);

  const handleVote = async () => {
    if (selectedDressId === null) {
      alert("Please select a dress color before submitting your vote.");

      return;
    }

    let token;

    // ローカルストレージにトークンがある場合は既存のトークンを使用
    if (localStorage.getItem("X-User-Token")) {
      token = localStorage.getItem("token");
    } else {
      // ない場合は新規トークンを取得
      token = uuidv4();
      localStorage.setItem("X-User-Token", token);
    }

    const voteData = {
      vote: {
        user_name: name,
        user_token: token,
        dress_id: selectedDressId,
      },
    };

    try {
      await apiFetch("/votes", {
        method: "POST",
        body: JSON.stringify(voteData),
      });

      window.location.href = "/result";
    } catch (error) {
      alert("投票は1度までです");
      window.location.href = "/result";
    }
  };

  return (
    <div className="relative max-w-screen-sm mx-auto">
      <div className="absolute top-0 right-0 w-[70%] h-[37%] bg-[#f2f2f2] z-0" />
      <div className="body-text pl-4 relative z-10 ml-[5%]">
        <div className="title flex justify-around pt-12">
          <h1
            className={clsx(
              "text-neutral-800 text-4xl font-normal leading-9 tracking-[2.88px]",
              fontRobotoSerif.className,
            )}
          >
            Guess
          </h1>
          <p
            className={clsx(
              "text-black text-xs font-normal mt-3 mr-2",
              fontShipporiMincho.className,
            )}
          >
            ― 新婦のドレスカラーを予想しよう ―
          </p>
        </div>

        <div
          className={clsx(
            "pl-4 mt-3 text-black text-xs font-normal leading-[30px] tracking-wide",
            fontShipporiMincho.className,
          )}
        >
          新婦のお色直しのドレスは何色だと思いますか?
          <br />
          私(新郎)は黒色一点張りでいこうと思います
          <br />
          黒のドレスってかっこよくて
          <br />
          東京會舘みたいな会場の雰囲気に
          <br />
          マッチすると思いませんか
          <br />
          是非皆さんが正解だと思う色に投票をしてください
          <br />
          正解者の中から抽選でオッズに応じた
          <br />
          ギフトを用意しております
          <br />
          お名前の入力も忘れずに
          <br />
        </div>
      </div>

      <div className="absolute top-[41%] left-0 w-[70%] h-[42%] bg-[#f2f2f2] z-0 max-w-96" />
      <div className="flex justify-center mt-20 relative z-10">
        <CountdownTimer />
      </div>

      <div className="form flex flex-col w-[95%] mx-auto max-w-96">
        <div className="grid grid-cols-2 gap-2 mt-12 mb-10 relative z-10">
          {dresses.map((dress) => (
            <DressBox
              key={dress.id}
              id={dress.id}
              imageSrc={dress.imageSrc}
              name={dress.name}
              odds={dress.odds}
              selected={dress.id === selectedDressId}
              votedCount={dress.voted_count}
              onClick={setSelectedDressId}
            />
          ))}
        </div>

        <Input
          isClearable
          className="mt-6 w-[316px] mx-auto"
          label="お名前"
          placeholder="入力してください"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          className={clsx(
            "mt-10 w-[214px] rounded-full mx-auto",
            fontShipporiMincho.className,
          )}
          onClick={handleVote}
        >
          送信
        </Button>
      </div>
    </div>
  );
};

export default VotePage;
