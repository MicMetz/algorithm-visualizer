import React, { useState } from 'react'
import { CONSTANTS } from '../../Utility/config';

function ShowValue({mainCanvasInputHandler, inputArrayLength}) {
  const MARGIN = CONSTANTS.margin;
  const SCREEN_WIDTH = window.innerWidth;
  const BAR_WIDTH = Math.floor((SCREEN_WIDTH - (MARGIN*inputArrayLength)) / inputArrayLength);


  const [enable, setEnable] = useState(JSON.parse(localStorage.getItem('options'))?.showHeight || false);
  return (
    <div className={`${BAR_WIDTH > 25 ? 'block' : 'hidden'} h-[2.7em] dark:lg:hover:bg-gray-500 lg:hover:bg-lightGreen group relative rounded-md ${mainCanvasInputHandler.state.options.showHeight && "dark:bg-gray-200 bg-lightGreen"}`} onClick={() => {
      mainCanvasInputHandler.setState(prev => ({options: {...prev.options, showHeight: !mainCanvasInputHandler.state.options.showHeight}}));
      setEnable(!enable);
      let j = JSON.parse(localStorage.getItem('options'));
      j["showHeight"] = !enable;
      localStorage.setItem('options', JSON.stringify(j))
    }}>

      <div className={`flex items-center justify-center relative space-y-2 cursor-pointer h-full border-[1px]  dark:border-gray-200 border-gray-300 dark:border-[1px] rounded-md ${mainCanvasInputHandler.state.options.showHeight && "dark:border-gray-400"}`}>
        <div className={`p-2 peer group`}>
          {<div className={`scale-[1.3] lg:group-hover:text-white ${mainCanvasInputHandler.state.options.showHeight ? "text-white dark:text-[#7B7B7c]" : "text-[#7B7B7c]"} w-5 text-center font-bold`}>V</div>}
        </div> 
      </div>    
      <p className={`shadow-lg bg-white z-10 absolute top-[4.4em] left-[50%] -translate-x-[50%] p-2 rounded-md hidden group-hover:block tool-tip-options text-gray-600 whitespace-nowrap font-semibold`}>Show values</p>
    </div>
  )
}

export default ShowValue