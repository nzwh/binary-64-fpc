"use client"

import React, { useState } from "react";
import { get_results } from "../../logic";

export default function Home() {

  const [baseValue, setBaseValue] = useState(2); 
  const [numberValue, setNumberValue] = useState("");
  const [exponentValue, setExponentValue] = useState("");

  const [input, setInput] = useState<{ number: string; base: number; exponent: number; } | null>(null);
  const [output, setOutput] = useState<{ displaced_binary: string; n_binary: string; sign: string; exponent_bits: string; mantissa: string; hex: string; s_case: string; full_output: string} | null>(null);

  const [showOutput, setShowOutput] = useState(false);
  const [groups, setGroups] = useState<string[] | null>(null);

  const handleReset = (event: any) => {
    setNumberValue("");
    setExponentValue("");
    setInput(null);
    setOutput(null);
    setShowOutput(false);
  };

  const handleBaseChange = (event: any) => {
    if (showOutput) setShowOutput(false);
    setNumberValue("");
    setExponentValue("");
    setBaseValue(parseInt(event.target.value));
  };

  const handleExponentChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (showOutput) setShowOutput(false);
    setExponentValue(event.target.value.slice(0, 5));
  };

  const handleNumberChange = (event: any) => {
    if (showOutput) setShowOutput(false);
    if (baseValue === 2)
      if (!/^[01.-]*$/.test(event.target.value)) return;
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

    let [displaced_binary, n_binary, sign, exponent_bits, mantissa, hex, s_case] = get_results(inputData.number, inputData.base, inputData.exponent);
    let full_output: string = sign + exponent_bits + mantissa;

    setOutput({ displaced_binary, n_binary, sign, exponent_bits, mantissa, hex, s_case, full_output });
    setGroups(full_output.match(/.{1,4}/g));
  };

  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);

    try {
      const textContent = createTextFileContent(input, output); // Function provided below
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'B64-FPC Results.txt';
      link.click();

      setTimeout(() => {
        URL.revokeObjectURL(url);
        setDownloading(false);
      }, 100);
    } catch (error) {
      console.error('Error downloading file:', error);
      setDownloading(false);
    }
  };

  function createTextFileContent(input: any, output: any) {
    const formattedResults = `
      Input value: ${input.number} x ${input.base}^${input.exponent}
      Normalized: ${output.n_binary}
      Case: ${output.s_case || 'Default'}

      Raw binary representation:
      ${output.full_output}
      Hex representation:
      ${output.hex}
      `;
  
    return formattedResults;
  }

  return (
    <main className="h-screen w-screen bg-[#D8DFE5] flex items-center justify-center">
      <section id="container" className="w-[80rem] h-[40rem] bg-gradient-to-b from-[#F0F6F9] to-[#e2e9ed] text-black rounded shadow-2xl shadow-slate-300 flex flex-col items-center justify-center transition-transform px-8 gap-8">

        <h1 className="bold font-black tracking-tight text-slate-800">Binary-64 Floating Point Calculator</h1>

        <form onSubmit={handleCalculate} action="javascript:void(0);" className="w-auto h-auto flex flex-col gap-4 items-center">

          <div className="flex space-x-4 text-zinc-600">
            <p className="mr-4">Select base number: </p>
            <label htmlFor="binary">Binary (base-2)</label>
            <input type="radio" name="conversion" id="binary" value="2" onChange={handleBaseChange} defaultChecked />
            <label htmlFor="decimal">Decimal (base-10)</label>
            <input type="radio" name="conversion" id="decimal" value="10" onChange={handleBaseChange} />
          </div>
          
          <section className="flex items-center justify-center space-x-4">
            <input type="number" id="input" step="any" className="bg-white text-zinc-800 outline-none text-5xl px-5 py-2 w-[56rem] h-20 rounded hover:bg-slate-200 transition colors duration-100 shadow-2xl shadow-zinc-200 border-zinc-100 border-2" placeholder={"1.00"} value={numberValue} onChange={handleNumberChange} required/>
            <h1 className="text-4xl select-none">*</h1>

            <div className="flex items-start gap-2">
              <div className="bg-white text-zinc-800 outline-none text-5xl h-20 px-5 py-2 flex items-center rounded hover:bg-slate-200 transition colors duration-100 shadow-2xl shadow-zinc-200 border-zinc-100 border-2 select-none">
                <h1>{baseValue}</h1>
              </div>

              <input type="number" id="exponent" step="any" className="w-[6rem] outline-none bg-white text-zinc-800 text-2xl px-2 py-1 rounded hover:bg-slate-200 transition colors duration-100 shadow-2xl shadow-zinc-200 border-zinc-100 border-2" placeholder={"0"} value={exponentValue} onChange={handleExponentChange} required/>
            </div>
          </section>

          {/* special case */}
          {output?.s_case != "" && showOutput && (
            <div className="flex flex-col gap-4 text-red-600 font-medium">
              <h1>Special case: {output?.s_case}</h1>
            </div>
          )}

          {/* buttons */}
          <div className="flex flex-row gap-4">
            <button className="w-[8rem] h-[2.5rem] text-white rounded bg-gradient-to-b from-violet-300 to-violet-400 shadow-xl hover:shadow-sm transition-shadow duration-200">Calculate</button>
            <button onClick={handleReset} className="w-[8rem] h-[2.5rem] text-white rounded bg-gradient-to-b from-violet-300 to-violet-400 shadow-xl hover:shadow-sm transition-shadow duration-200">Reset</button>
            <button className="w-[12rem] h-[2.5rem] text-white rounded bg-gradient-to-b from-violet-300 to-violet-400 shadow-xl hover:shadow-sm transition-shadow duration-200" onClick={handleDownload} disabled={downloading}>
              {downloading ? 'Downloading...' : 'Download Results'}
            </button>
          </div>
        </form>


        {/* output */}
        {showOutput && (
          <div className="flex flex-col gap-8">
            
            <div className="flex flex-col items-center gap-3">
            <h1 className="text-zinc-600">Raw binary representation</h1>
            <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
              {groups?.map((group, index) => (
                <div key={index} className="w-auto h-8 text-2xl flex items-center gap-2">{group.split("").map((value, index) => {
                  return <span key={index} className="text-2xl bg-white px-2 py-1 shadow-xl shadow-zinc-200 rounded hover:bg-slate-200 transition colors duration-200 select-none">{value}</span>
                })}</div>
              ))}
            </div>
            </div>
            
            <div className="flex flex-col items-center gap-3">
            <h1 className="text-zinc-600">Hex representation</h1>
            <div className="w-[50rem] h-8 text-2xl flex items-center justify-center gap-2">
              <span className="text-2xl bg-white px-2 py-1 shadow-xl shadow-zinc-200 rounded hover:bg-slate-200 transition colors duration-200 select-none">{"0x"}</span>
              {output?.hex.substring(2).split("").map((value, index) => {
                return <span key={index} className="text-2xl bg-white px-2 py-1 shadow-xl shadow-zinc-200 rounded hover:bg-slate-200 transition colors duration-200 select-none">{value}</span>
              })}
            </div>
            </div>



            {/* <p>Base: {input?.base}</p>
            <p>Number: {input?.number}</p>
            <p>Exponent: {input?.exponent}</p>

            <p>Binary: {output?.displaced_binary}</p>
            <p>Normalized: {output?.n_binary}</p>

            <p>Sign: {output?.sign}</p>
            <p>Exponent Bits: {output?.exponent_bits}</p>
            <p>Mantissa: {output?.mantissa.match(/.{1,8}/g)?.join(" ")}</p>
            <p>Hex: {output?.hex}</p>
            <p>Case: {output?.s_case}</p> */}
          </div>
        )}
      </section>
    </main>
  );
}
