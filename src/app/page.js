"use client";

import { useState } from "react";

const icons = ["🍫", "🍰", "🧁"];

export default function SlotMachine() {
  const [detailIcon, setDetailIcon] = useState(null);
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
        <div className="bg-[#FFEEF4] border-[0.5px] border-black rounded-md w-full h-full p-4 flex-col justify-center items-center">
          <div className="bg-[#FFF8F5] border-[0.5px] border-black rounded-t-[100%] w-full h-[120px] flex items-center justify-center">
            <h1 className="text-5xl italic text-gray-700">sweet spin</h1>
          </div>

          <div className="h-[40px] bg-[#FDDCE5] border-[0.5px] border-black rounded-[20px] flex justify-center items-center gap-2 gap-x-4 my-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-[20px] h-[20px] bg-[#FFF8F5] border-[0.5px] border-black rounded-full mx-3"></div>
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

          <div className="flex justify-between items-center mb-4 text-sm text-gray-700 gap-3">
            <span className="w-1/5 h-[40px] bg-[#FFF8F5] border-[0.5px] border-black rounded-[10px] flex justify-center items-center
            ">{score} </span>
            <button
              onClick={spin}
              disabled={spinning}
              className="w-3/5 h-[40px] bg-[#FFF8F5] border-[0.5px] border-black rounded-[10px] italic disabled:opacity-50"
            >
              {spinning ? "spinning..." : "start"}
            </button>
            <span className="w-1/5 h-[40px] bg-[#FFF8F5] border-[0.5px] border-black rounded-[10px] flex justify-center items-center
            ">{unlockedIcons.length}</span>
          </div>

          <div className="h-[160px] bg-[#FFF8F5] border-[0.5px] border-black rounded-[20px] flex items-center justify-center text-black text-center text-sm px-2">
            {result}
          </div>
        </div>
      </div>
      

      {/* Icon Record Panel or Detail View */}
      <div className="w-1/2 h-full bg-[#FFEEF4] border-[0.5px] border-black p-4 rounded-md space-y-4 overflow-y-auto">
        {/* 詳細介紹畫面 */}
        {detailIcon ? (
          <div className="flex flex-col h-full">
            {/* 返回按鈕 */}
            <button
              onClick={() => setDetailIcon(null)}
              className="mb-4 w-[100px] bg-[#FFF8F5] border-[0.5px] border-black rounded px-2 py-1 text-sm"
            >
              ← 返回
            </button>

            <div className="flex flex-col items-center justify-center text-center space-y-4 flex-1">
              <div className="text-6xl">{detailIcon}</div>
              <h2 className="text-2xl font-semibold">甜點介紹</h2>
              <p className="text-sm px-4">
                {/* 可以改為從資料庫或物件讀取 */}
                這是關於 {detailIcon} 的冷知識或詳細介紹！你知道嗎？它其實...
              </p>
            </div>
          </div>
        ) : (
          // 圖鑑模式
          icons.map((icon, i) => {
            const isUnlocked = unlockedIcons.includes(icon);
            return (
              <div
                key={i}
                className="flex items-center rounded overflow-hidden p-2 gap-[20px]"
              >
                {/* 左側 Icon 區 */}
                <div className='relative bg-[#FFF8F5] border-[0.5px] border-black flex items-center justify-center w-20 h-20 text-3xl rounded-[10px]'>
                  {icon}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-[#FFF8F5]/60 rounded-[10px] pointer-events-none" />
                  )}
                </div>

                {/* 右側內容區 */}
                <div
                  className={`border-[0.5px] border-black flex-1 flex justify-center items-center w-20 h-20 text-center rounded-[10px] flex-col ${
                    isUnlocked ? "bg-[#FFF8F5] text-black" : "bg-[#FDDCE5] text-black"
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <span>冷知識</span>
                      <button
                        onClick={() => setDetailIcon(icon)}
                        className="text-xs mt-1 underline"
                      >
                        查看
                      </button>
                    </>
                  ) : (
                    <span>?</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>


    </div>
  );
}
