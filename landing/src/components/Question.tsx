"use client";

import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Question = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="cursor-pointer space-y-4 rounded-lg bg-base-300 p-4 text-left"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between text-2xl">
        <h3 className="text-xl font-bold">{question}</h3>
        <IoIosArrowDown
          className={`duration-300 ${open ? "-rotate-180" : ""}`}
        />
      </div>
      {open && <p className="text-base">{answer}</p>}
    </div>
  );
};
