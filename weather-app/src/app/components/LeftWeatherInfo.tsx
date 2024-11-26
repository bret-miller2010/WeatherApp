import React from "react";
import { Weather } from "../types/types";

export const LeftWeatherInfo = ({ weatherData }: { weatherData: Weather }) => {
   return (
      <div className="p-1 rounded-xl w-[200px] h-[400px] bg-white bg-opacity-10 border-2 border-black border-opacity-35 shadow-xl">
         <div className="flex flex-col h-[400px] justify-around">
            <div className="flex flex-col justify-between h-1/2 border-b-solid border-black">
               <div className="text-center text-xl">{weatherData?.name}</div>
               <div className="w-full flex justify-center text-5xl">{weatherData?.main.temp}&#8457;</div>
               <div className="flex justify-center space-x-10 text-center text-xl">
                  <div>
                     <div>{weatherData?.main.temp_max}&#8457;</div>
                     <div>H</div>
                  </div>
                  <div>
                     <div>{weatherData?.main.temp_min}&#8457;</div>
                     <div>L</div>
                  </div>
               </div>
            </div>
            <div className="flex justify-center items-center h-1/2">
            
            </div>
         </div>
      </div>
   );
}
