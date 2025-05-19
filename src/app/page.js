"use client";

import { useState } from "react";

const icons = ["\uD83C\uDF70", "\uD83C\uDF69", "\uD83E\uDDC1", "\uD83C\uDF53", "\uD83C\uDF66"];

export default function SlotMachine() {
  const [slots, setSlots] = useState(["\uD83C\uDF70", "\uD83C\uDF70", "\uD83C\uDF70"]);
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
          setResult("\uD83C\uDF89 \u606D\u559C\u4E2D\u734E\uFF01\u4E09\u500B\u4E00\u6A23 \uD83C\uDF89");
          setScore((prev) => prev + 5);

          const newIcon = currentSlots[0];
          if (!unlockedIcons.includes(newIcon)) {
            setUnlockedIcons((prev) => [...prev, newIcon]);
          }
        } else if (unique.size === 2) {
          setResult("\uD83D\uDC4D \u5DEE\u4E00\u9EDE\uFF01\u4E2D\u4E86\u5169\u500B\u4E00\u6A23\uFF5E");
          setScore((prev) => prev + 3);
        } else {
          setResult("\uD83D\uDE22 \u6C92\u4E2D\u734E\uFF0C\u518D\u8A66\u4E00\u6B21\uFF01");
        }
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#F0F9F8] flex justify-center items-start gap-10 p-8">
      {/* Slot Machine UI */}
      <div className="w-1/2 h-full">
        <div className="bg-[#FFEEF4] border-[0.5px] border-black rounded-md w-full h-full p-4">
          <div className="bg-[#FFF8F5] border-[0.5px] border-black rounded-t-[100%] w-full h-20 flex items-center justify-center">
            <h1 className="text-xl italic text-gray-700">sweet spin</h1>
          </div>

          <div className="bg-[#FDDCE5] border-[0.5px] border-black flex justify-center gap-2 my-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-[#FFF8F5] rounded-full"></div>
            ))}
          </div>

          <div className="bg-[#FDDCE5] flex justify-center gap-2 mb-4 text-4xl">
            {slots.map((icon, index) => (
              <div
                key={index}
                className="w-20 h-20 bg-pink-100 rounded flex items-center justify-center"
              >
                {icon}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4 text-sm text-gray-700">
            <span>{score} 分</span>
            <button
              onClick={spin}
              disabled={spinning}
              className="px-4 py-1 border rounded bg-pink-50 italic disabled:opacity-50"
            >
              {spinning ? "轉動中..." : "start"}
            </button>
            <span>{unlockedIcons.length}</span>
          </div>

          <div className="h-20 bg-pink-100 rounded flex items-center justify-center text-center text-sm px-2">
            {result}
          </div>
        </div>
      </div>
      

      {/* Icon Record Panel */}
      <div className="grid grid-cols-2 gap-4 bg-pink-50 p-4 rounded-md">
        {icons.map((icon, i) => (
          <div
            key={i}
            className={`flex items-center justify-center rounded border w-16 h-16 text-3xl ${
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
  );
}
