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
      <div className="bg-black h-screen w-screen">
        
      </div>
   );
}
