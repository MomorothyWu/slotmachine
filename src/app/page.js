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
          setResult("Sweet Jackpot! +5");
          setScore((prev) => prev + 5);

          const newIcon = currentSlots[0];
          if (!unlockedIcons.includes(newIcon)) {
            setUnlockedIcons((prev) => [...prev, newIcon]);
          }
        } else if (unique.size === 2) {
          setResult("Almost a Treat! +3");
          setScore((prev) => prev + 3);
        } else {
          setResult("No Dessert This Time!");
        }
      }
    }, 100);
  };

  return (
    <div className="h-screen bg-[#F0F9F8] flex justify-center items-start gap-10 p-8">
      {/* Slot Machine UI */}
      <div className="w-1/2 h-full">
        <div className="bg-[#FFEEF4] border-[0.5px] border-black rounded-md w-full h-full p-4">
          <div className="bg-[#FFF8F5] border-[0.5px] border-black rounded-t-[100%] w-full h-[120px] flex items-center justify-center">
            <h1 className="text-xl italic text-gray-700">sweet spin</h1>
          </div>

          <div className="h-[40px] bg-[#FDDCE5] border-[0.5px] border-black rounded-[20px] flex justify-center items-center gap-2 my-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-[20px] h-[20px] bg-[#FFF8F5] border-[0.5px] border-black rounded-full"></div>
            ))}
          </div>

          <div className="h-[200px] bg-[#FDDCE5] border-[0.5px] border-black rounded-[20px] flex justify-center items-center gap-4 p-4 mb-4 text-4xl">
            {slots.map((icon, index) => (
              <div
                key={index}
                className="w-1/3 h-full bg-[#FFF8F5] border-[0.5px] border-black rounded flex items-center justify-center"
              >
                {icon}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4 text-sm text-gray-700">
            <span className="w-[80px] h-[40px] bg-[#FFF8F5] border-[0.5px] border-black rounded-[10px] flex justify-center items-center
            ">{score} 分</span>
            <button
              onClick={spin}
              disabled={spinning}
              className="w-[120px] h-[40px] bg-[#FFF8F5] border-[0.5px] border-black rounded-[10px] italic disabled:opacity-50"
            >
              {spinning ? "spinning..." : "start"}
            </button>
            <span className="w-[80px] h-[40px] bg-[#FFF8F5] border-[0.5px] border-black rounded-[10px] flex justify-center items-center
            ">{unlockedIcons.length}</span>
          </div>

          <div className="h-[160px] bg-[#FFF8F5] border-[0.5px] border-black rounded-[20px] flex items-center justify-center text-black text-center text-sm px-2">
            {result}
          </div>
        </div>
      </div>
      

      {/* Icon Record Panel */}
      <div className="w-1/2 h-full bg-[#FFEEF4] border-[0.5px] border-black p-4 rounded-md space-y-4 overflow-y-auto">
        {icons.map((icon, i) => {
          const isUnlocked = unlockedIcons.includes(icon);
          return (
            <div
              key={i}
              className="flex items-center rounded overflow-hidden p-2 gap-[20px]"
            >
              {/* 左側 Icon 區 */}
              <div
                className='relative bg-[#FFF8F5] border-[0.5px] border-black flex items-center justify-center w-20 h-20 text-3xl rounded-[10px]'
              >
                {icon}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-[#FFF8F5]/60 rounded-[10px] pointer-events-none" />
                )}

              </div>

              {/* 右側內容區 */}
              <div className={` border-[0.5px] border-black flex-1 flex justify-center items-center w-20 h-20 text-xl rounded-[10px] text-center ${
                  isUnlocked
                    ? "bg-white text-black"
                    : "bg-[#FDDCE5] text-black"
                }`}>
                {isUnlocked ? "冷知識" : "?"}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
