"use client"

import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [baseValue, setBaseValue] = useState(2); 
  const [numberValue, setNumberValue] = useState("");
  const [exponentValue, setExponentValue] = useState("");
  const [input, setInput] = useState<{ number: string; base: number; exponent: number; } | null>(null);
  const [showOutput, setShowOutput] = useState(false);

  const handleBaseChange = (event: any) => {
    setNumberValue(""); // Clear number field
    setExponentValue(""); // Clear exponent field
    setBaseValue(parseInt(event.target.value));
  };

  const handleExponentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = e.target.value.slice(0, 5); // Limits the input to 5 characters
    setExponentValue(newValue);
  };

  const handleNumberChange = (event: any) => {
    setNumberValue(event.target.value);
  };

  const handleCalculate = () => {
    const inputData = {
      base: baseValue,
      number: numberValue,
      exponent: parseInt(exponentValue)
    };
    
    setInput(inputData); 
    setShowOutput(true);
  };

  return (
    <main className="h-screen w-screen bg-slate-600 flex items-center justify-center">
      <section id="container" className=" w-[80rem] h-[40rem] bg-white text-black">

        {/* radio button for binary and decimal */}
        <div className="flex space-x-4 text-black">
          <label htmlFor="binary">Binary</label>
          <input type="radio" name="conversion" id="binary" value="2" onChange={handleBaseChange} defaultChecked />
          <label htmlFor="decimal">Decimal</label>
          <input type="radio" name="conversion" id="decimal" value="10" onChange={handleBaseChange} />
        </div>
      
          {/* input field */} 
          <label htmlFor="input">Enter a number</label>
        <input type="number" id="input" step="any" className="w-[20rem] h-[3rem] bg-gray-200 text-black" value={numberValue} onChange={handleNumberChange} />

        {/* exponent */}
        <label htmlFor="exponent">Enter the exponent</label>
        <input type="number" id="exponent" step="any" className="w-[20rem] h-[3rem] bg-gray-200 text-black" value={exponentValue} onChange={handleExponentChange} />

        {/* button */}
        <button onClick={handleCalculate}  className="w-[10rem] h-[3rem] bg-black text-white">Calculate</button>

        {/* output */}
        {showOutput && (
          <div className="mt-4">
            <p>Base: {input?.base}</p>
            <p>Number: {input?.number}</p>
            <p>Exponent: {input?.exponent}</p>
          </div>
        )}
      </section>
    </main>
  );
}
