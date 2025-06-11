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
在古代中美洲，瑪雅人與阿茲特克人視可可豆為極其珍貴的資源，甚至當作貨幣使用。
人們用它來交易日用品、支付稅金，甚至還能買奴隸。可可不僅是飲品，更是財富的象徵。

巧克力與香檳：
在宗教與儀式中，瑪雅人和阿茲特克人在飲用可可飲品前，會刻意搖晃杯子讓其發出聲響，藉此驅除邪靈。
這個舉動被認為可能是現代「碰杯慶祝」習俗的起源之一，讓每次舉杯都多了點歷史的餘韻。

白巧克力其實不是巧克力？
雖然名字裡有「巧克力」，但白巧克力其實不含可可固體，只使用可可脂、糖與奶粉。
因此從技術上來說，它並不屬於真正的巧克力。不過它香滑的口感，仍讓許多人欲罷不能。

巧克力與健康：
適量食用黑巧克力對健康其實有不少好處。黑巧克力富含抗氧化物質「黃酮類化合物」，有助於降低血壓、促進心血管健康。
當然，前提是選擇可可含量高、糖分少的版本，別把它當糖果狂吃就是了。

巧克力與流行文化：
從《巧克力冒險工廠》到哈利波特的「巧克力蛙」，巧克力早已成為流行文化的常駐明星。
不只如此，情人節送巧克力在日本甚至變成一種社交文化，還分成「本命巧克力」、「義理巧克力」與「友巧」，反映出細緻的人際互動和情感分類。`,

  "🧁": `名稱由來：
杯子蛋糕起源於19世紀的美國。它之所以叫「cupcake」，並不是因為長得像杯子，而是因為早期的食譜是用「杯」作為計量單位（例如：1杯糖、2杯麵粉）。
這樣的做法讓沒有磅秤的人也能輕鬆烘焙，堪稱烘焙史上的平民主義代表。

紐約市 vs 杯子蛋糕：
2015年，紐約市教育局為了對抗兒童肥胖問題，頒布了一項「校園健康政策」，明文禁止學生在校園內攜帶或販售杯子蛋糕。
這項政策導致義賣會、生日慶祝活動都無法提供這種甜點，引起家長與學生反彈。

世界紀錄：
目前最多人同時裝飾杯子蛋糕的世界紀錄是1,228人，由英國在2019年創下，現場宛如甜點嘉年華。
而最大杯子蛋糕的紀錄則由美國 Georgetown Cupcake 團隊創下，重達1,176公斤，可謂甜點界的巨無霸。`,

  "🍮": `原始布丁不是甜點？
「Pudding」這個詞最早在中世紀英格蘭，指的其實是一種鹹食——用肉類與穀物填塞入腸衣製成的雜燴腸，有點像今天的黑布丁（black pudding）。
甜布丁的形式一直到18世紀才開始流行，因此我們今天所認知的滑嫩甜點，其實是布丁歷史中的「後起之秀」。

法式布丁 vs 英式布丁：
布丁在不同文化中有不同的樣貌。英式布丁大多數為麵包或蛋糕質地的甜點，如傳統的聖誕布丁（Christmas pudding）、麵包布丁（bread pudding），偏重穀類與酒香；而法式布丁（如焦糖布丁 crème caramel、奶酪 panna cotta）則以蛋奶混合後烘焙或冷藏凝固，口感滑順細緻，外型也更精緻講究。

世界最貴布丁：
想吃布丁吃到頂級奢華？英國一間高級飯店曾推出一款極致奢華的金箔巧克力布丁，成分包括香檳、魚子醬、稀有巧克力與真正的 24K 金箔，每份售價高達 3,000 英鎊（約新台幣 12 萬元）！這大概是只有在富豪夢中才會出現的甜點。`,

  "🍩": `名稱由來：
最早的甜甜圈被稱為「油炸蛋糕」（Oily Cakes），由荷蘭移民於1809年帶到美國。他們會將甜麵團丟進熱油中炸成金黃色的小球，作為節慶時的甜點。
後來這種點心逐漸演變出中空的圓形造型，也發展出各式各樣的餡料與糖霜，成為今天我們熟悉的甜甜圈。

甜甜圈日：
美國的「全國甜甜圈日」（National Donut Day）定於每年6月的第一個星期五，起源可追溯至第一次世界大戰。
當時救世軍的女性志願者為提升美軍士兵士氣，親手炸甜甜圈送到前線，這份甜蜜成了戰場中的安慰。之後為紀念她們的貢獻，美國特別設立了這個節日，讓甜甜圈不只是點心，更是一段歷史的象徵。

甜甜圈之城：
說到甜甜圈王國，第一名不是美國，而是加拿大！
根據統計，加拿大是全球人均甜甜圈店數量最多的國家，特別是在多倫多、溫哥華等城市，幾乎每隔幾條街就能看到甜甜圈專賣店。
Tim Hortons 更是加拿大國民品牌，讓甜甜圈深深融入當地日常生活與文化。`,

  "🍪": `名稱來源：
英文中的「cookie」一詞，來自荷蘭語 koekje，意思是「小蛋糕」。17世紀時，荷蘭移民將這種點心帶到美洲，逐漸演變成今日的餅乾文化。
這也說明了為什麼美式英語用「cookie」，而英式英語則常用「biscuit」，兩者其實是文化與歷史交織的結果。

世界最受歡迎的餅乾：
如果要選出餅乾界的常勝軍，那絕對是「巧克力豆曲奇」（chocolate chip cookie）。
這款經典點心誕生於1938年，由美國馬薩諸塞州的Ruth Wakefield 意外發明，原本她只是想做一款巧克力餅乾，卻沒想到巧克力沒完全融化，反而變成香濃的巧克力豆，從此開啟餅乾界的傳奇。

太空曲奇：
2019年，NASA 首次在國際太空站進行烘焙實驗，成功烤出史上第一批「太空曲奇」。
這不只是人類第一次在零重力環境下製作餅乾，也開啟了「太空食物不只能加熱、還能現烤」的新篇章。據說那股香氣在太空艙裡飄得特別久，讓宇航員大呼幸福。`,
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
      <div className="w-full sm:w-1/2 sm:h-full h-[600px] flex flex-col justify-center items-center">

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

          <div className="absolute top-[62%] w-843/1000 flex justify-between items-center text-sm font-semibold text-[#71523E]">
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
      <div className="w-full sm:w-1/2 sm:h-full h-[580px] text-[#71523E] flex flex-col justify-center items-center overflow-y-auto">
        
        <div className="h-full aspect-[16/25] flex flex-col justify-between items-center bg-contain bg-no-repeat bg-center
        p-5 space-y-[20px] overflow-y-auto"
          style={{ backgroundImage: "url('/images/rightbg.svg')" }}>
          
          {/* 詳細介紹畫面 */}
          {detailIcon ? (
            <div className="relative h-full rounded-xl flex flex-col bg-contain bg-no-repeat bg-center p-4 overflow-y-auto"
            style={{ backgroundImage: "url('/images/innerbg.svg')" }}>
              {/* 返回按鈕 */}
              <button
                onClick={() => setDetailIcon(null)}
                className="absolute top-4 left-4  w-[40px] h-[40px] bg-contain bg-no-repeat bg-center"
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