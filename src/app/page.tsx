import BackgroundSvgs from "@/components/BackgroundSvgs";
import SearchShop from "@/components/SearchShop";
import { cookies } from "next/headers";
import React from "react";

export default function Home() {
  return (
    <main className="fixed inset-0 flex min-h-screen flex-col bg-[url(/grain.svg)] bg-blend-color-dodge">
      <BackgroundSvgs />
      <div className="w-full flex flex-col">
      <div className="mx-auto mt-48 flex items-center text-4xl font-bold text-blue-700 antialiased md:text-5xl">
        <h1>S</h1>
        <h1>H</h1>
        <span className="relative h-8 w-8 rounded-full bg-blue-700 md:h-10 md:w-10">
          <span className="absolute inset-1.5 rounded-full bg-white md:inset-2"></span>
        </span>
        <h1>P</h1>
      </div>
      <div className="w-full flex">

      <SearchShop className="mt-12 md:mt-16 relative mx-auto" />
      </div>
      </div>
    </main>
  );
}
