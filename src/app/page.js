"use client";

import { useState } from "react";

const icons = ["🍫", "🍦", "🧁", "🍮", "🍩", "🍪"];

const dessertImages = {
  "🍫": "/images/chocolate.svg",
  "🍦": "/images/icecream.svg",
  "🧁": "/images/cupcake.svg",
  "🍮": "/images/pudding.svg",
  "🍩": "/images/donut.svg",
  "🍪": "/images/cookie.svg",
};

const dessertTitle = {
  "🍫": "巧克力 Chocolate",
  "🍦": "冰淇淋 Ice Cream",
  "🧁": "杯子蛋糕 Cupcakes",
  "🍮": "布丁 Pudding",
  "🍩": "甜甜圈 Donut",
  "🍪": "餅乾 Cookie",
};

const dessertSubtitle = {
  "🍫": "苦與甜的完美詐騙",
  "🍦": "夏天的救贖",
  "🧁": "吃兩個剛剛好，吃三個也不罪惡",
  "🍮": "布丁的口感就像雲朵一樣",
  "🍩": "甜甜圈的口感就像雲朵一樣",
  "🍪": "餅乾的口感就像雲朵一樣",
};

const dessertDetails = {
  "🍫": `曾作為貨幣：
瑪雅人和阿茲特克人曾將可可豆作為貨幣使用，用於交易和納稅。

巧克力與香檳：
瑪雅人和阿茲特克人會在飲用可可飲品前搖晃杯子，發出聲響以驅邪，這可能是現今「碰杯」習俗的起源。

白巧克力不含可可固體：
白巧克力實際上不含可可固體，因此技術上並非真正的巧克力。`,

  "🍦": `牛奶用量：
製作1加侖的冰淇淋需要約12磅的牛奶。

舔食次數：
平均需要50次舔食才能吃完一球冰淇淋。

最受歡迎口味：
香草是最受歡迎的冰淇淋口味，其次是巧克力。`,

  "🧁": `名稱由來：
「Cupcake」這個名稱源於19世紀，因為這種蛋糕是用杯子量取材料，並在杯子中烘焙而得名。

世界最大杯子蛋糕：
2009年，GourmetGiftBaskets.com 製作了重達1,224磅的世界最大杯子蛋糕。

快速烘焙：
由於體積小，杯子蛋糕比傳統蛋糕更快烘焙完成，約需17分鐘。`,

  "🍮": `原始布丁不是甜點？
「Pudding」一詞在中世紀英格蘭原本指的是肉類雜燴腸，是一種鹹食；甜布丁的形式直到18世紀才開始流行。

法式布丁 vs 英式布丁：
英式布丁多為麵包或蛋糕質地，如聖誕布丁；而法式布丁（如焦糖布丁、奶酪）則以蛋奶烘焙為主，口感更滑嫩。

世界最貴布丁：
英國一間飯店推出的金箔巧克力布丁，使用香檳、魚子醬和24K金箔製成，售價高達 3,000英鎊（約新台幣12萬元）！`,

  "🍩": `名稱由來：
最早的甜甜圈被稱為「油炸蛋糕」（Oily Cakes），由荷蘭移民於1809年帶到美國。

甜甜圈日：
美國的「全國甜甜圈日」起源於第一次世界大戰期間，救世軍志願者為前線士兵提供甜甜圈。

甜甜圈之城：
加拿大的甜甜圈店數量在全球人均排名第一。`,

  "🍪": `名稱來源：
英文「cookie」源自荷蘭語 koekje，意指「小蛋糕」，由17世紀荷蘭移民帶入美洲。

世界最受歡迎的餅乾：
根據多項調查，巧克力豆曲奇（chocolate chip cookie）是美國最受歡迎的餅乾種類，自1938年由Ruth Wakefield 在馬薩諸塞州發明以來廣受喜愛。

太空曲奇：
2019年，NASA 首次在國際太空站進行烘焙實驗，烤出了史上第一批太空曲奇。`,
};


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
    <div className="w-screen min-h-screen bg-[#F0F9F8] flex flex-col sm:flex-row justify-center items-start overflow-auto gap-10 p-8">
      {/* Slot Machine UI */}
      <div className="w-full sm:w-1/2 sm:h-full">
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
                className="w-1/3 h-full bg-[#FFF8F5] border-[0.5px] border-black rounded flex items-center justify-center p-2"
              >
                <img src={dessertImages[icon]} alt={dessertTitle[icon]} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4 text-sm text-black gap-3">
            <span className="w-1/5 h-[40px] bg-[#FFF8F5] border-[0.5px] border-black rounded-[10px] flex justify-center items-center
            ">{score} </span>
            <button
              onClick={spin}
              disabled={spinning}
              className="w-3/5 h-[40px] bg-[#FFF8F5] border-[0.5px] border-black rounded-[10px] italic disabled:opacity-50 font-extrabold"
            >
              {spinning ? "spinning..." : "start"}
            </button>
            <span className="w-1/5 h-[40px] bg-[#FFF8F5] border-[0.5px] border-black rounded-[10px] flex justify-center items-center
            ">{unlockedIcons.length}</span>
          </div>

          <div className="h-[160px] bg-[#FFF8F5] border-[0.5px] border-black rounded-[20px] flex items-center justify-center text-black text-center text-xl px-2">
            {result}
          </div>
        </div>
      </div>
      

      {/* Icon Record Panel or Detail View */}
      <div className="w-full sm:w-1/2 sm:h-full bg-[#FFEEF4] border-[0.5px] border-black text-black p-4 rounded-md space-y-4 overflow-y-auto">
        {/* 詳細介紹畫面 */}
        {detailIcon ? (
          <div className="bg-[#FFF8F5] border-[0.5px] border-black rounded-xl flex flex-col h-full p-4">
            {/* 返回按鈕 */}
            <button
              onClick={() => setDetailIcon(null)}
              className="w-[24px] bg-[#FFEEF4] border-[0.5px] border-black rounded-full px-[2px]"
            >
              ← 
            </button>

            <div className="w-full h-full flex flex-col justify-start items-start flex-1">
              <p className="w-full text-right text-2xl font-semibold">
                {dessertTitle[detailIcon] || "尚無詳細介紹。"}
              </p>
              <p className="w-full text-sm font-light text-right whitespace-pre-line font-noto mb-4">
                {dessertSubtitle[detailIcon] || "尚無詳細介紹。"}
              </p>
              <p className="text-sm font-light text-left whitespace-pre-line font-noto">
                {dessertDetails[detailIcon] || "尚無詳細介紹。"}
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
                <div className='relative bg-[#FFF8F5] border-[0.5px] border-black flex items-center justify-center w-20 h-20 text-3xl rounded-[10px] p-2'>
                  <img src={dessertImages[icon]} alt={dessertTitle[icon]} className="w-full h-full object-contain" />
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-[#FFF8F5]/60 rounded-[10px] pointer-events-none" />
                  )}
                </div>

                {/* 右側內容區 */}
                <div
                  className={`border-[0.5px] border-black flex-1 flex justify-center items-center w-20 h-20 text-center rounded-[10px] flex-col p-3 ${
                    isUnlocked ? "bg-[#FFF8F5] text-black" : "bg-[#FDDCE5] text-black"
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <div className="w-full h-full flex justify-between items-baseline">
                        <div className="w-full h-full flex flex-col gap-y-2">
                          <div className="text-left">
                            {dessertTitle[icon] || "尚無詳細介紹。"}
                          </div>
                          <div className="text-left text-sm font-light font-noto">
                            {dessertSubtitle[icon] || "尚無詳細介紹。"}
                          </div>
                        </div>
                        <button
                          onClick={() => setDetailIcon(icon)}
                          className="border-[0.5px] border-black rounded-full bg-[#FDDCE5] px-[2px]"
                        >
                          →
                        </button>
                      </div>
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