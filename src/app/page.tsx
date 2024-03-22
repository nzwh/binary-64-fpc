import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-slate-600 flex items-center justify-center">
      <section id="container" className=" w-[80rem] h-[40rem] bg-white text-black">

        {/* radio button for binary and decimal */}
        <div className="flex space-x-4 text-black">
          <label htmlFor="binary">Binary</label>
          <input type="radio" name="binary" id="binary" />
          <label htmlFor="decimal">Decimal</label>
          <input type="radio" name="decimal" id="decimal" />
        </div>
      
          {/* input field */} 
          <label htmlFor="input">Enter a number</label>
        <input type="number" id="input" step="any" className="w-[20rem] h-[3rem] bg-gray-200 text-black" />

        {/* exponent */}
        <label htmlFor="exponent">Enter the exponent</label>
        <input type="number" id="exponent" step="any" className="w-[20rem] h-[3rem] bg-gray-200 text-black" />

        {/* button */}
        <button className="w-[10rem] h-[3rem] bg-black text-white">Calculate</button>

        {/* output */}
      </section>
    </main>
  );
}
