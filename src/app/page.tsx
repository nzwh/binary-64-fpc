"use client"

import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [exponentValue, setExponentValue] = useState("");

  const handleRadioChange = () => {
    setInputValue(""); // Clear input field
    setExponentValue(""); // Clear exponent field
  };

  const handleExponentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = e.target.value.slice(0, 5); // Limits the input to 5 characters
    setExponentValue(newValue);
  };

  return (
    <main className="h-screen w-screen bg-slate-600 flex items-center justify-center">
      <section id="container" className=" w-[80rem] h-[40rem] bg-white text-black">

        {/* radio button for binary and decimal */}
        <div className="flex space-x-4 text-black">
          <label htmlFor="binary">Binary</label>
          <input type="radio" name="conversion" id="binary" onChange={handleRadioChange} defaultChecked />
          <label htmlFor="decimal">Decimal</label>
          <input type="radio" name="conversion" id="decimal" onChange={handleRadioChange} />
        </div>
      
          {/* input field */} 
          <label htmlFor="input">Enter a number</label>
        <input type="number" id="input" step="any" className="w-[20rem] h-[3rem] bg-gray-200 text-black" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

        {/* exponent */}
        <label htmlFor="exponent">Enter the exponent</label>
        <input type="number" id="exponent" step="any" className="w-[20rem] h-[3rem] bg-gray-200 text-black" value={exponentValue} onChange={handleExponentChange} />

        {/* button */}
        <button className="w-[10rem] h-[3rem] bg-black text-white">Calculate</button>

        {/* output */}
      </section>
    </main>
  );
}
