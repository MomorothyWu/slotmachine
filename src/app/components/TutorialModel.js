'use client';
import { useState } from 'react';
import Image from 'next/image';

const images = [
  '/images/popout1.png',
  '/images/popout2.png',
  '/images/popout3.png',
  '/images/popout4.png',
];

export default function InstructionModal({ onFinish }) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < images.length - 1) {
      setStep(step + 1);
    } else {
      onFinish(); // 結束說明
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center max-w-[90%]">
        <Image
          src={images[step]}
          alt={`step-${step}`}
          width={300}
          height={300}
          className="mb-4"
        />
        <button
          onClick={handleNext}
          className={`w-[80px] h-[40px] self-end bg-contain bg-no-repeat bg-center
            ${step === images.length - 1 
              ? "bg-[url('/images/startbutton.svg')]"
              : "bg-[url('/images/arrow.svg')]"
            }`}
        >
        </button>
      </div>
    </div>
  );
}
