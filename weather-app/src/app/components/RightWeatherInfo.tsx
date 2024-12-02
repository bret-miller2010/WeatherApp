import React from "react";
import { Weather } from "../types/types";

export const RightWeatherInfo = ({ weatherData }: { weatherData: Weather }) => {
  return (
    <div className="hidden h-[400px] w-[200px] justify-between rounded-xl border-2 border-black border-opacity-35 bg-white bg-opacity-50 p-5 text-base shadow-xl backdrop-blur-sm">
      <div className="flex flex-col justify-between">
        <div>Visibility:</div>
        <div>Coverage:</div>
        <div>Humidity:</div>
        <div>Country:</div>
      </div>
      <div className="flex flex-col justify-between text-right">
        <div>{weatherData?.visibility}m</div>
        <div>{weatherData?.clouds.all}%</div>
        <div>{weatherData.main.humidity}%</div>
        <div>{weatherData?.sys.country}</div>
      </div>
    </div>
  );
};
