import React from "react";
import Image from "next/image";
import { City } from "../types/types";

export const BottomWeatherList = ({ cityList }: { cityList: City[] }) => {
  return (
    <div className="z-20 flex h-1/6 w-full justify-around space-x-2 rounded-xl border-2 border-black border-opacity-35 bg-white bg-opacity-50 p-3 shadow-xl backdrop-blur-sm">
      {cityList.map((city) => {
        return (
          <div
            className="flex h-full w-1/5 flex-col items-center justify-between rounded-xl border-black bg-white bg-opacity-25 p-1 shadow-xl"
            key={city.id}
          >
            <div>{city.name}</div>
            <Image
              src={city.icon}
              height={50}
              width={50}
              alt="Weather Icon"
              className="z-10 rounded-xl"
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
