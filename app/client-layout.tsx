"use client";

import { useState, useEffect, useTransition } from "react";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation"; // usePathname のみを使用

import { fontZilla, fontUbuntuMono } from "@/config/fonts";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname(); // 現在のパスを取得

  useEffect(() => {
    const handleStart = () => startTransition(() => setIsLoading(true));
    const handleComplete = () => startTransition(() => setIsLoading(false));

    handleStart(); // 初回ロード時にローディングを開始
    handleComplete(); // 初回ロード完了時にローディングを終了

    return () => {
      handleComplete(); // クリーンアップ時にローディングを解除
    };
  }, [pathname, isPending]);

  return (
    <div className="flex flex-col h-screen relative">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin" />
        </div>
      )}
      <main className="container mx-auto max-w-7xl flex-grow relative">
        <div className="relative w-full h-[499px]">
          <Image
            priority
            alt="Picture of the author"
            layout="fill"
            objectFit="cover"
            src="/1000151615.jpg"
          />
          <div className="absolute top-[5%] left-[5%] text-white">
            <div className={clsx("text-4xl font-normal", fontZilla.className)}>
              Guess
              <br />
              The Bride’s
              <br />
              Perfect Dress Hue
            </div>
          </div>
          <div className="absolute left-[46%] bottom-[4%]">
            <div
              className={clsx(
                "mt-4 text-base font-normal text-white",
                fontUbuntuMono.className,
              )}
            >
              Scroll
            </div>
            <div className="w-[42px] h-[0px] mt-10 border-t-1 border-white transform rotate-90 animate-indeterminate-bar " />
          </div>
        </div>
        {children}
      </main>
      <footer className="w-full flex items-center justify-center flex-col mt-10">
        <div className="w-52 h-[0px] border border-black" />
        <div className="flex justify-center w-full py-4">
          <div
            className={clsx(
              "text-black text-base font-normal flex items-end mb-1",
              fontUbuntuMono.className,
            )}
          >
            Created By
          </div>
          <div
            className={clsx(
              "ml-3 text-black text-5xl font-normal bg-gradient-to-r from-[#000] to-[#666] text-transparent bg-clip-text",
              fontUbuntuMono.className,
            )}
          >
            Onikukirai
          </div>
        </div>
      </footer>
    </div>
  );
}
