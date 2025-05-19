"use client";

import { useState, useEffect } from "react";

const icons = ["🍰", "🍩", "🧁", "🍓", "🍦"];

export default function SlotMachine() {
  const [slots, setSlots] = useState(["🍰", "🍰", "🍰"]);
  const [result, setResult] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [score, setScore] = useState(0);
  const [unlockedIcons, setUnlockedIcons] = useState([]);

  const spin = () => {
    setResult("");
    setSpinning(true);

    let spins = [0, 0, 0];
    let maxSpins = [30, 35, 40];
    let currentSlots = [...slots];

    const spinInterval = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        if (spins[i] < maxSpins[i]) {
          currentSlots[i] = icons[Math.floor(Math.random() * icons.length)];
          spins[i]++;
        }
      }
      setSlots([...currentSlots]);

      if (spins.every((count, i) => count >= maxSpins[i])) {
        clearInterval(spinInterval);
        setSpinning(false);

        const unique = new Set(currentSlots);
        if (unique.size === 1) {
          setResult("🎉 恭喜中獎！三個一樣 🎉");
          setScore((prev) => prev + 5);

          // 解鎖圖鑑
          const newIcon = currentSlots[0];
          if (!unlockedIcons.includes(newIcon)) {
            setUnlockedIcons((prev) => [...prev, newIcon]);
          }

        } else if (unique.size === 2) {
          setResult("👍 差一點！中了兩個一樣～");
          setScore((prev) => prev + 3);
        } else {
          setResult("😢 沒中獎，再試一次！");
        }
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-pink-600">🍭 甜點拉霸機 🍭</h1>

      <div className="text-lg text-pink-800 mb-4">目前分數：{score} 分</div>

      <div className="flex gap-4 mb-6 text-6xl">
        {slots.map((icon, index) => (
          <div
            key={index}
            className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center border-4 border-pink-300"
          >
            {icon}
          </div>
        ))}
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded-xl text-lg shadow-md disabled:opacity-50"
      >
        {spinning ? "轉動中..." : "開始拉霸"}
      </button>

      <div className="mt-6 text-2xl text-pink-700 font-semibold">{result}</div>

      <div className="mt-10 w-full max-w-md">
        <h2 className="text-xl font-semibold text-pink-600 mb-2">🍬 解鎖圖鑑</h2>
        <div className="flex flex-wrap gap-2">
          {icons.map((icon, i) => (
            <div
              key={i}
              className={`w-14 h-14 flex items-center justify-center text-3xl rounded-full border-2 ${
                unlockedIcons.includes(icon)
                  ? "bg-white border-pink-400"
                  : "bg-gray-300 border-gray-400 text-gray-400"
              }`}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
