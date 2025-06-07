"use client";
import { useState } from "react";
import InstructionModal from './components/TutorialModel.js';

const icons = ["🍫", "🧁", "🍮", "🍩", "🍪"];

const dessertImages = {
  "🍫": "/images/chocolate.svg",
  "🧁": "/images/cupcake.svg",
  "🍮": "/images/pudding.svg",
  "🍩": "/images/donut.svg",
  "🍪": "/images/cookie.svg",
};

const dessertTitle = {
  "🍫": "巧克力 Chocolate",
  "🧁": "杯子蛋糕 Cupcakes",
  "🍮": "布丁 Pudding",
  "🍩": "甜甜圈 Donut",
  "🍪": "餅乾 Cookie",
};

const dessertSubtitle = {
  "🍫": "苦與甜的完美詐騙",
  "🧁": "吃兩個剛剛好，吃三個也不罪惡",
  "🍮": "只要夠Q，就能獨當一面",
  "🍩": "中空設計，熱量依舊實心",
  "🍪": "鬆脆外皮、邪惡內餡，完美小壞蛋",
};

const dessertDetails = {
  "🍫": `曾作為貨幣：
瑪雅人和阿茲特克人曾將可可豆作為貨幣使用，用於交易和納稅。

巧克力與香檳：
瑪雅人和阿茲特克人會在飲用可可飲品前搖晃杯子，發出聲響以驅邪，這可能是現今「碰杯」習俗的起源。

白巧克力不含可可固體：
白巧克力實際上不含可可固體，因此技術上並非真正的巧克力。`,

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
  const [showInstructions, setShowInstructions] = useState(true);

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
  
    // 決定是否要作弊提高中獎率
    const winChance = Math.random();
    let forceMatch = false;
    let forceTwoMatch = false;
    let luckyIcon = "";
  
    if (winChance < 0.3) {
      forceMatch = true;
      luckyIcon = icons[Math.floor(Math.random() * icons.length)];
    } else if (winChance < 0.6) {
      forceTwoMatch = true;
      luckyIcon = icons[Math.floor(Math.random() * icons.length)];
    }
  
    // 隨機決定哪一格要不同（如果是兩格相同時用）
    const mismatchIndex = Math.floor(Math.random() * 3);
  
    const spinInterval = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        if (spins[i] < maxSpins[i]) {
          // 是否即將停止
          const isFinalSpin = spins[i] === maxSpins[i] - 1;
  
          if (isFinalSpin) {
            if (forceMatch) {
              currentSlots[i] = luckyIcon;
            } else if (forceTwoMatch) {
              currentSlots[i] = (i === mismatchIndex)
                ? icons[Math.floor(Math.random() * icons.length)]
                : luckyIcon;
            } else {
              currentSlots[i] = icons[Math.floor(Math.random() * icons.length)];
            }
          } else {
            // 一般隨機轉動
            currentSlots[i] = icons[Math.floor(Math.random() * icons.length)];
          }
  
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
    <div className="w-screen min-h-screen sm:h-screen bg-[#F0F9F8] flex flex-col sm:flex-row justify-center items-start overflow-auto gap-10 p-8">
      {/* Slot Machine UI */}
      <div className="w-full sm:w-1/2 sm:h-full flex flex-col justify-center items-center">

        <div className="relative h-full aspect-[31/50] flex flex-col justify-center items-center bg-contain bg-no-repeat bg-center overflow-y-auto"
        style={{ backgroundImage: "url('/images/slotmachine.svg')" }}>

          <div className="absolute top-[37%] w-843/1000 aspect-[1000/416] rounded-[20px] flex justify-center items-center gap-6 p-4 text-4xl">
            {slots.map((icon, index) => (
              <div
                key={index}
                className="w-1/3 h-full rounded flex items-center justify-center p-2"
              >
                <img src={dessertImages[icon]} alt={dessertTitle[icon]} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>

          <div className="absolute top-[61.5%] w-843/1000 flex justify-between items-center text-sm font-semibold text-[#71523E]">
            <span className="w-6/25 h-[40px] rounded-[10px] flex justify-center items-center
            ">{score} </span>
            <button
              onClick={spin}
              disabled={spinning}
              className="w-11/25 h-[40px] rounded-[10px] italic disabled:opacity-50 font-extrabold"
            >
              {spinning ? "spinning..." : "start"}
            </button>
            <span className="w-6/25 h-[40px] rounded-[10px] flex justify-center items-center
            ">{unlockedIcons.length}</span>
          </div>

          <div className="absolute top-[70%] w-843/1000 aspect-[1000/236] rounded-[20px] flex items-center justify-center text-[#71523E] font-bold text-center text-xl">
            {result}
          </div>
        </div>

      </div>

      {/* Icon Record Panel or Detail View */}
      <div className="w-full sm:w-1/2 sm:h-full text-[#71523E] flex flex-col justify-center items-center overflow-y-auto">
        
        <div className="h-full aspect-[16/25] flex flex-col justify-between items-center bg-contain bg-no-repeat bg-center
        p-5 space-y-[20px] overflow-y-auto"
          style={{ backgroundImage: "url('/images/rightbg.svg')" }}>
          
          {/* 詳細介紹畫面 */}
          {detailIcon ? (
            <div className="h-full rounded-xl flex flex-col bg-contain bg-no-repeat bg-center p-4"
            style={{ backgroundImage: "url('/images/innerbg.svg')" }}>
              {/* 返回按鈕 */}
              <button
                onClick={() => setDetailIcon(null)}
                className="w-[40px] h-[40px] bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: "url('/images/arrowback.svg')" }}
              >
              </button>

              <div className="w-full h-full flex flex-col justify-start items-start flex-1 gap-5">
                <p className="w-full text-right text-2xl font-semibold">
                  {dessertTitle[detailIcon] || "尚無詳細介紹。"}
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
                  className="w-full h-4/25 flex justify-between items-center rounded overflow-hidden gap-[20px] m-0"
                >

                  {/* 左側 Icon 區 */}
                  <div className='relative flex items-center justify-center h-full aspect-[1/1] bg-cover p-2'
                  style={{ backgroundImage: "url('/images/leftarea.svg')" }}>
                    <img src={dessertImages[icon]} alt={dessertTitle[icon]} className="w-full h-full object-contain" />
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-[#FAECDE]/60 rounded-[10px] pointer-events-none" />
                    )}
                  </div>

                  {/* 右側內容區 */}
                  <div
                    className={`flex justify-center items-center h-full aspect-[3/1] rounded-[10px] p-3 
                      bg-cover bg-no-repeat bg-center overflow-hidden
                      ${isUnlocked
                        ? "bg-[url('/images/rightarea2.svg')]"
                        : "bg-[url('/images/rightarea1.svg')]"
                      }`}
                  >
                    {isUnlocked ? (
                      <>
                        <div className="flex-1 min-w-0 text-left text-[20px] leading-snug break-words">
                          {dessertTitle[icon] || "尚無詳細介紹。"}
                        </div>

                        <button
                          onClick={() => setDetailIcon(icon)}
                          className="w-[32px] h-[32px] ml-2 flex-shrink-0 bg-contain bg-no-repeat bg-center"
                          style={{ backgroundImage: "url('/images/arrow.svg')" }}
                        />
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
      {showInstructions && (
        <InstructionModal onFinish={() => setShowInstructions(false)} />
      )}

    </div>
  );
}