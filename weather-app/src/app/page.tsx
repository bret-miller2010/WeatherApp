/** @format */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Weather } from "./types/types";
import { ConvertWindDirection } from "./utility";
import Image from "next/image";
import { LeftWeatherInfo } from "./components/LeftWeatherInfo";
import { RightWeatherInfo } from "./components/RightWeatherInfo";
import { BottomWeatherList } from "./components/BottomWeatherList";
import { TopContainer } from "./components/TopContainer";

export default function Home() {
   const [status, setStatus] = useState("loading");
   const [weatherData, setWeatherData] = useState<Weather>();
   const [cityValue, setCityValue] = useState<string>("");
   const iconURL = `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`;
   const unsplashAPIKey = process.env.NEXT_PUBLIC_UNSPLASH_KEY;
   const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
   const unsplashURL = `https://api.unsplash.com/photos/random`;
   const [backgroundImage, setBackgroundImage] = useState<string>("");

   const handleSubmit = (e: any) => {
      e.preventDefault();
      setCityValue("");
   };

   const handleChange = (e: any) => {
      setCityValue(e.target.value);
   };

   const getImage = async (weather: string) => {
      const { data } = await axios(`${unsplashURL}?query=${weather}&client_id=${unsplashAPIKey}`);
      setBackgroundImage(data.urls.full);
   };

   const getWeatherData = async (position: any) => {
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
         getImage(data.weather[0].main);
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
      <div className="bg-gray-600 h-screen w-screen flex justify-center items-center">
         {weatherData ? (
            <div className="rounded-xl flex flex-col w-[640px] h-[800px] relative p-5">
               {backgroundImage ? (
                  <Image
                     src={backgroundImage}
                     fill={true}
                     alt="Weather Icon"
                     className="rounded-xl absolute z-10"
                  />
               ) : null}
               <TopContainer
                  weatherData={weatherData}
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  city={cityValue}
               />
               <div className="h-3/4 w-full flex flex-col justify-around z-20">
                  <div className="flex justify-between items-center w-full p-5">
                     <LeftWeatherInfo weatherData={weatherData} />
                     <div className="hidden p-5 rounded-xl h-[200px] w-[300px] bg-blue-500 border-2 border-black border-opacity-35">Middle</div>
                     <RightWeatherInfo weatherData={weatherData} />
                  </div>
                  <BottomWeatherList />
               </div>
            </div>
         ) : (
            <div className="text-4xl text-white">Loading...</div>
         )}
      </div>
   );
}
