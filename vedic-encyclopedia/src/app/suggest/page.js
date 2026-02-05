'use client'
import { sendmsg } from "@/actions/suggest.js"
import { useState } from "react";

export default function TypeDropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const options = [
    { label: "Suggestion", value: "suggestion", icon: "/bulb.svg" },
    { label: "Feedback", value: "feedback", icon: "/feedback.svg" },
    { label: "Both", value: "both", icon: "/both.svg" },
  ];

  const selected = options.find(o => o.value === value);

  return (
    <div className="w-full h-screen flex justify-center items-center px-4 overflow-hidden">
      <form 
        action={sendmsg} 
        className='w-full max-w-5xl h-fit max-h-[95vh] outline-5 outline-[#fffbeb] border border-orange-700 bg-[#cb925a]/30 backdrop-blur-xs drop-shadow-xl rounded-lg p-5 md:p-8 flex flex-col items-center overflow-y-auto no-scrollbar'
      >
        {/* HEADER - Reduced margins */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className='antialiased font-serif text-orange-900 text-2xl md:text-4xl'>
            We Would Love Hearing From You !
          </h1>
          <p className="mt-1 antialiased font-medium text-orange-900 text-sm md:text-base opacity-90">
            Feel free to share your ideas, suggestions or feedback.
          </p>
        </div>

        {/* INPUTS CONTAINER - Tightened gaps */}
        <div className="w-full max-w-xl flex flex-col gap-3 md:gap-4">
          
          {/* TYPE DROPDOWN */}
          <div className="flex flex-col gap-1">
            <label className="font-bold text-orange-900 text-base md:text-lg">Type</label>
            <div className="relative w-full">
              <input type="hidden" name="type" value={value} />
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full h-10 md:h-11 flex items-center justify-between px-4 rounded-sm border-2 border-[#d97706] bg-[#fed7aa] text-[#78350f] font-medium"
              >
                <span className="flex items-center gap-2">
                  {selected && <img src={selected.icon} className="w-4 h-4 md:w-5 md:h-5" alt="" />}
                  {selected ? selected.label : "Select Type..."}
                </span>
                <svg className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 7l5 5 5-5" />
                </svg>
              </button>

              {open && (
                <ul className="absolute w-full mt-1 bg-white border-2 border-[#d97706] rounded-sm shadow-2xl z-50 overflow-hidden">
                  {options.map(opt => (
                    <li
                      key={opt.value}
                      onClick={() => {
                        setValue(opt.value);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-orange-100 text-[#78350f]"
                    >
                      <img src={opt.icon} className="w-4 h-4 md:w-5 md:h-5" alt="" />
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* CATEGORY */}
          <div className="flex flex-col gap-1">
            <label className="font-bold text-orange-900 text-base md:text-lg">Category</label>
            <input 
              type="text"
              name="category" 
              placeholder="e.g. Rituals, Scriptures" 
              className='bg-[#fed7aa] px-4 h-10 md:h-11 text-[#78350f] focus:ring-1 focus:ring-orange-500 outline-none font-medium w-full border-2 rounded-sm border-[#d97706]'
            />
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col gap-1">
            <label className="font-bold text-orange-900 text-base md:text-lg">Message</label>
            <textarea 
              name='message' 
              placeholder='Kindly Share Your Suggestions...' 
              required 
              className='bg-[#fed7aa] p-3 focus:ring-1 focus:ring-orange-500 outline-none text-[#78350f] font-medium resize-none w-full h-24 md:h-32 border-2 rounded-sm border-[#d97706]'
            />
          </div>

          {/* SUBMIT BUTTON - Balanced height */}
          <button 
            type='submit' 
            className='mt-2 w-full hover:-translate-y-0.5 hover:scale-[1.01] active:scale-95 transition-all duration-200 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 shadow-lg font-serif text-xl md:text-2xl py-2 md:py-3 font-bold cursor-pointer text-center rounded-xl text-white'
          >
            Send
          </button> 
        </div>
      </form>
    </div>
  )
}