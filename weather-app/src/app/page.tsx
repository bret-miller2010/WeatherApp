/** @format */
"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Weather, City } from "./types/types";
//import { ConvertWindDirection } from "./utility";
import Image from "next/image";
import { LeftWeatherInfo } from "./components/LeftWeatherInfo";
import { RightWeatherInfo } from "./components/RightWeatherInfo";
import { BottomWeatherList } from "./components/BottomWeatherList";
import { TopContainer } from "./components/TopContainer";

export default function Home() {
  //const [status, setStatus] = useState("loading");
  const [cityList, setCityList] = useState<City[]>([]);
  const [weatherData, setWeatherData] = useState<Weather>();
  const [cityValue, setCityValue] = useState<string>("");
  // const iconURL = `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`;
  const unsplashAPIKey = process.env.NEXT_PUBLIC_UNSPLASH_KEY;
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
  const unsplashURL = `https://api.unsplash.com/photos/random`;
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const createCityObject = (data: Weather) => {
    const cityObject: City = {
      name: data.name,
      high: data.main.temp_max,
      low: data.main.temp_min,
      id: data.id,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
    return cityObject;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getLocationData(cityValue);
    setCityValue("");
  };

  const handleChange: React.ChangeEventHandler<HTMLFormElement> = (
    e: React.ChangeEvent<HTMLFormElement>,
  ) => {
    setCityValue(e.target.value);
  };

  const getImage = async (weather: string) => {
    const { data } = await axios(
      `${unsplashURL}?query=${weather}&client_id=${unsplashAPIKey}`,
    );
    setBackgroundImage(data.urls.full);
  };

  const getWeatherData = async (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const locationURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    //const testURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
      const { data } = await axios(locationURL);
      setWeatherData(data);
      const cityObject = createCityObject(data);
      setCityList([cityObject, ...cityList]);
      // setStatus("waiting");
      //const tester = await axios(testURL);
      getImage(data.weather[0].main);
    } catch {
      // setStatus("error");
    }
  };

  const getLocationData = async (city: string) => {
    const locationURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    try {
      const { data } = await axios(locationURL);
      const newList = [...cityList];
      setWeatherData(data);
      if(newList.length > 4) {
        newList.pop();
      }
      const cityObject = createCityObject(data);
      setCityList([cityObject, ...newList]);
      getImage(data.weather[0].main);
    } catch {
      //  setStatus("error");
    }
  };

  const getLocation = () => {
    // setStatus("loading");
    navigator.geolocation.getCurrentPosition((position) => {
      getWeatherData(position);
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-600">
      {weatherData ? (
        <div className="relative flex h-[800px] w-[640px] flex-col rounded-xl p-5">
          {backgroundImage ? (
            <Image
              src={backgroundImage}
              fill={true}
              alt="Weather Icon"
              className="absolute z-10 rounded-xl"
            />
          ) : (
            <div className="absolute z-10 h-full w-full rounded-xl bg-white"></div>
          )}
          <TopContainer
            weatherData={weatherData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            city={cityValue}
          />
          <div className="z-20 flex h-2/3 w-full items-center justify-center p-5">
            <LeftWeatherInfo weatherData={weatherData} />
            <div className="hidden h-[200px] w-[300px] rounded-xl border-2 border-black border-opacity-35 bg-blue-500 p-5">
              Middle
            </div>
            <RightWeatherInfo weatherData={weatherData} />
          </div>
          <BottomWeatherList cityList={cityList} />
        </div>
      ) : (
        <div className="text-4xl text-white">Loading...</div>
      )}
    </div>
  );
}
