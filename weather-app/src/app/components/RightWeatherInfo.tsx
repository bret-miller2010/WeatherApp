import React from "react";
import { Weather } from "../types/types";

export const RightWeatherInfo = ({ weatherData }: { weatherData: Weather }) => {
   return (
      <div className="p-5 rounded-xl w-[200px] h-[400px] bg-white bg-opacity-10 border-2 border-black border-opacity-35 flex text-base justify-between shadow-xl">
         <div className="flex flex-col justify-between">
            <div>Visibility:</div>
            <div>Coverage:</div>
            <div>Humidity:</div>
            <div>Country:</div>
         </div>
         <div className="text-right flex flex-col justify-between">
            <div>{weatherData?.visibility}m</div>
            <div>{weatherData?.clouds.all}%</div>
            <div>{weatherData.main.humidity}%</div>
            <div>{weatherData?.sys.country}</div>
         </div>
      </div>
   );
};
