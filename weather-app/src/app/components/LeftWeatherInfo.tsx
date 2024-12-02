import React from "react";
import { Weather } from "../types/types";
import { ConvertWindDirection } from "../utility";

export const LeftWeatherInfo = ({ weatherData }: { weatherData: Weather }) => {
  return (
    <div className="h-full rounded-xl border-2 border-black border-opacity-35 bg-white bg-opacity-50 p-5 shadow-xl backdrop-blur-sm">
      <div className="flex h-[350px] flex-col justify-around">
        <div className="border-b-solid flex h-1/2 flex-col justify-between">
          <div className="text-center text-xl">{weatherData?.name}</div>
          <div className="flex w-full justify-center text-5xl">
            {weatherData?.main.temp}&#8457;
          </div>
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
        <div className="flex h-1/2 flex-col items-center justify-around">
          <img
            className="h-16 w-16"
            src="https://www.svgrepo.com/show/535741/wind.svg"
            alt=""
          />
          <div>{ConvertWindDirection(weatherData.wind.deg)}</div>
          <div>{weatherData.wind.speed} MPH</div>
        </div>
      </div>
    </div>
  );
};
