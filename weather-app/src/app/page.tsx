"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Weather } from "./types/types";
import { ConvertWindDirection } from "./utility";

export default function Home() {
   const [status, setStatus] = useState("loading");
   const [weatherData, setWeatherData] = useState<Weather>();
   const iconURL = `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`;

   const getWeatherData = async (position: any) => {
      const apiKey = "8eef35469d8a69bcef56e0c790946604";
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const locationURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
      const testURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      try {
         const { data } = await axios(locationURL);
         console.log(data);
         setWeatherData(data);
         setStatus("waiting");
         const tester = await axios(testURL);
         console.log(tester);
      } catch {
         setStatus("error");
      }
   };

   const getLocation = () => {
      setStatus("loading");
      navigator.geolocation.getCurrentPosition((position) => {
         getWeatherData(position);
      });
   };

   useEffect(() => {
      getLocation();
   }, []);

   return (
      <div className="bg-black text-white w-[1000px] h-[1000px] flex flex-col justify-between p-5 rounded-2xl">
         <div className="flex justify-between text-white">
            <div>Weather Dashboard</div>
            <div>2024</div>
         </div>
         <div className="w-full flex justify-center items-center">
            <div className="w-[850px] h-[850px] bg-white rounded-3xl text-black p-2 flex">
               <div className="w-1/4 bg-red-500 p-2 flex flex-col items-center space-y-6">
                  <input
                     className="px-2 bg-black w-32"
                     placeholder="Search city..."
                     type="text"
                  />
                  <div className="text-2xl">
                     <div className="">
                      <div>{weatherData?.name}</div>
                        <div className="flex justify-between">
                           <div>{weatherData?.main.temp}&#8457;</div>
                           <div>+/- 5</div>
                        </div>
                        <div className="flex justify-between text-base text-xs">
                           <div>{weatherData?.main.temp_max}&#8457;</div>
                           <div>{weatherData?.main.temp_min}&#8457;</div>
                        </div>
                     </div>
                     <div className="flex flex-col justify-center items-center text-sm">
                        <div>Humidity: {weatherData?.main.humidity}%</div>
                        <div>
                           Wind: {ConvertWindDirection(weatherData?.wind.deg)} {weatherData?.wind.speed} mph
                        </div>
                        <div>Visibility: {weatherData?.visibility}m</div>
                     </div>
                  </div>
                  <div className="h-[150px] flex flex-col justify-center items-center">
                     <img
                        className="h-20"
                        src={iconURL}
                        alt=""
                     />
                     <div>{weatherData?.weather[0].main}</div>
                  </div>
               </div>
               <div className="w-3/4 bg-blue-500">Main stuff</div>
            </div>
         </div>
         <div className="flex justify-between">
            <div>{weatherData?.main.temp}&#8457;</div>
            <div>{weatherData?.name}</div>
         </div>
      </div>
   );
}
