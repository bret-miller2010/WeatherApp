/** @format */

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
		<div className="bg-black h-screen w-screen flex justify-center items-center">
			<div className="rounded-xl p-2 flex flex-col justify-around items-center space-y-5 bg-white w-[640px] h-[800px]">
				<div className="flex flex-col pt-20 gap-y-5 items-center h-1/3 w-full">
					<div className="text-center">
						<p>Worldwide Weather App!</p>
						<p>Current location will automatically loaded.</p>
						<p>Use the search field below to look up weather in other areas.</p>
					</div>
					<input
						defaultValue="Search any city..."
						className="bg-black w-60 rounded-xl"
						type="text"
					/>
				</div>
				<div className="h-2/3 w-full flex flex-col justify-around">
					<div className="flex justify-between items-center w-full">
						<div className="p-5 rounded-xl w-[200px] h-[300px] bg-red-500">Left Side</div>
						<div className="hidden p-5 rounded-xl h-[200px] w-[300px] bg-blue-500">Middle</div>
						<div className="p-5 rounded-xl w-[200px] h-[300px] bg-red-500">Right</div>
					</div>
					<div className="p-5 h-[150px] rounded-xl w-full bg-green-500">Large Wrapper of main info for each city</div>
				</div>
			</div>
		</div>
	);
}
