import React from "react";
import Image from "next/image";
import { City } from "../types/types";

export const BottomWeatherList = ({ cityList }: { cityList: City[] }) => {
   return (
      <div className="p-3 rounded-xl flex justify-around space-x-2 w-full h-[150px] bg-white bg-opacity-50 border-2 border-black border-opacity-35 shadow-xl">
         {cityList.map((city) => {
            return (
               <div
                  className="border-black h-full w-1/5 bg-white bg-opacity-25 flex flex-col items-center justify-between p-1 rounded-xl shadow-xl"
                  key={city.id}>
                  <div>{city.name}</div>
                  <Image
                     src={city.icon}
                     height={50}
                     width={50}
                     alt="Weather Icon"
                     className="rounded-xl z-10"
                  />
                  <div className="flex space-x-4 text-[10px]">
                     <div>{city.high}&#8457;</div>
                     <div>{city.low}&#8457;</div>
                  </div>
               </div>
            );
         })}
      </div>
   );
};
