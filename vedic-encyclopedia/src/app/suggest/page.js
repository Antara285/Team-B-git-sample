'use client'
import { sendmsg } from "@/actions/suggest.js"
import { useState } from "react";
export default function TypeDropdown (){
   const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const options = [
    { label: "Suggestion", value: "suggestion", icon: "/bulb.svg" },
    { label: "Feedback", value: "feedback", icon: "/feedback.svg" },
    { label: "Both", value: "both", icon: "/both.svg" },
  ];

  const selected = options.find(o => o.value === value);
  return (
    <form action={sendmsg} className=' my-[2rem] mx-[11rem] w-[150vh] h-[90vh] outline-5 outline-[#fffbeb] border-1 border-solid border-orange-700 bg-[#cb925a]/30 backdrop-brightness-100 backdrop-invert backdrop-opacity-[-10] backdrop-blur-xs drop-shadow-xl rounded-lg backdrop-brightness-20 drop-shadow-xl/20 h-[25rem] '>
      <div className="flex-col justify-items-center pt-5">
      <h1 className='pt-[9px] antialiased font-serif text-orange-900 text-4xl'>We Would Love Hearing From You !</h1>
      <p className="mt-2 antialiased font-medium text-orange-900">Feel free to share your ideas , suggestions or feedback.</p>
      </div>
      <div className="flex flex-col justify-items-start mb-5"> 
        <label className="font-bold text-orange-900 text-lg ml-[24vh] mt-5">Type</label>
       <div className="relative w-[40rem] mx-[25vh] mt-3">
      
      {/* Hidden input so form can submit */}
      <input type="hidden" name="type" value={value} />

      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-[2.5rem] flex items-center justify-between px-3
        rounded-sm border-2 border-[#d97706] bg-[#fed7aa]
        text-[#78350f] font-medium backdrop-invert backdrop-opacity-10"
      >
        <span className="flex items-center gap-2">
          {selected && (
            <img src={selected.icon} className="w-4 h-4" />
          )}
          {selected ? selected.label : "Select Type..."}
        </span>

        {/* arrow */}
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 7l5 5 5-5" />
        </svg>
      </button>

      {/* Menu */}
      {open && (
        <ul className="absolute w-full mt-1 bg-white border-2 border-[#d97706] rounded-sm shadow-lg z-50">
          {options.map(opt => (
            <li
              key={opt.value}
              onClick={() => {
                setValue(opt.value);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer
              hover:bg-orange-100 text-[#78350f]"
            >
              <img src={opt.icon} className="w-4 h-4" />
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>

      </div>
      <label className="font-bold text-orange-900 text-lg ml-[24vh]">Category</label>
      <textarea name="category" placeholder="Enter Category" className='bg-[#fed7aa] pl-2 pt-[0.4rem] mx-[25vh] mb-5 text-[#78350f] focus:outline-none font-medium resize-none select-all w-[40rem] h-[7vh] mt-2 flex border-2 rounded-sm border-[#d97706]'></textarea>
      <label className="font-bold text-orange-900 text-lg ml-[24vh]">Message</label>
      <textarea name='message' placeholder='Kindly Share Your Suggestions or Feedback...' required className='bg-[#fed7aa] py-[10px] pl-[10px] mx-[25vh] mb-5 focus:outline-none text-[#78350f] font-medium resize-none select-all w-[40rem] h-[15vh] mt-2 flex justify-center border-2 rounded-sm border-[#d97706]'></textarea>
     <button type='submit' className='ml-[45vh] hover:-translate-y-1 hover:scale-110 transition delay-10 duration-80 ease-linear shadow-lg transition-all duration-200 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-700 hover:via-amber-700 hover:to-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 antialiased font-serif text-2xl/10 font-bold cursor-pointer text-center rounded-xl text-white w-[70vh] h-[8vh] mt-[-2]'>Send</button> 
    </form>
  )
}
