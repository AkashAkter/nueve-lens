"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="relative p-8 md:p-12 rounded-3xl surface/80 backdrop-blur-lg border border-custom/60 shadow-2xl">
          <div className="absolute inset-0 overflow-hidden rounded-3xl -z-10">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/nueve-lens.png"
                alt="Nueve lens"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>

          <div className="inline-block border-2 border-custom text-light px-6 py-2 rounded-full text-sm font-light tracking-widest uppercase mb-6">
            Launching Soon
          </div>

          <p className="text-xl text-light mb-12 max-w-md mx-auto leading-relaxed">
            Capturing moments, creating memories. Launching soon.
          </p>

          <div className="flex justify-center items-center gap-4 mb-12">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
              <div key={item.label} className="text-center">
                <div className="relative">
                  <div className="primary text-white rounded-2xl p-4 min-w-[80px] shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl md:text-3xl font-mono font-bold tracking-tighter">
                      {item.value.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine"></div>
                </div>
                <div className="text-xs text-light mt-3 font-medium uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <p className="text-light text-lg">
            Get ready for something extraordinary
          </p>
        </div>
      </div>
    </div>
  );
}
