import React, { useEffect, useState } from 'react'
import { ReactComponent as Moon } from '../../../../img/moon.svg'
import { ReactComponent as Sun } from '../../../../img/sun.svg'

const ThemeToggle = () => {
  const [night, setNightMode] = useState(true);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('dark')) || night) {
      document.documentElement.classList.add('dark');
      setNightMode(true);
      if (localStorage.getItem('dark') === "false") {
        document.documentElement.classList.remove('dark');
        setNightMode(false);
      }
    } else {
      document.documentElement.classList.remove('dark')
      setNightMode(false);
    }
  }, [night])

  return (
    <div className={`${night ? 'bg-gradient-to-r from-gray-900 to-gray-800' : "bg-gradient-to-r from-gray-300 to-white"} w-[3.5em] h-[33px] bg-white rounded-full relative border-[2px] border-gray-400 mr-[1em]`} 
    onClick={() => { 
      setNightMode(!night)
      localStorage.setItem("dark", JSON.stringify(!night));
    }}>
      <div className={`transition-all duration-300 ease-in-out absolute w-[25px] h-[25px] bg-gray-100 shadow-sm ${night ? "top-[.15em] translate-x-[1.6em] shadow-black" : " shadow-gray-400 top-[.15em] translate-x-[.1em]"} rounded-full`}>
        <div className={`transition-all duration-300 ease-in-out absolute w-[23px] h-[23px] bg-gray-200 top-[.06em] left-[5%] rounded-full flex items-center justify-center`}>
          {night ? <Moon className={`text-gray-800 scale-[.8]`}/> : <Sun className={`text-gray-500 scale-[.8]`}/>}
        </div>
      </div>
    </div>
  )
}

export default ThemeToggle