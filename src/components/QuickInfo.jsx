import React, { useEffect, useState } from "react";

const QuickInfo = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (n) => n.toString().padStart(2, "0");

  const time = `${formatNumber(now.getHours())}:${formatNumber(now.getMinutes())}:${formatNumber(now.getSeconds())}`;
  const date = `${formatNumber(now.getDate())}/${formatNumber(now.getMonth() + 1)}/${now.getFullYear()}`;

  return (
    <>
      <div className="fixed top-1 left-2 text-[20px] text-white opacity-70 z-50 font-mono bg-[#000000b6] backdrop:blur-2xl px-3 py-1 rounded-full shadow-lg">
         {time}
      </div>
      <div className="fixed top-1 right-2 text-[20px] text-white opacity-70 z-50 font-mono bg-[#000000b6] backdrop:blur-2xl px-3 py-1 rounded-full shadow-lg">
         {date}
      </div>
    </>
  );
};

export default QuickInfo;
