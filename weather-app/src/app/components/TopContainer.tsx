import React from "react";
import { Weather } from "../types/types";
import { convertUnixTime } from "../utility";

export const TopContainer = ({
   weatherData,
   handleSubmit,
   handleChange,
   city,
}: {
   weatherData: Weather;
   handleSubmit: React.FormEventHandler<HTMLFormElement>;
   handleChange: React.ChangeEventHandler;
   city: string;
}) => {
   return (
      <div className="flex flex-col gap-y-2 items-center h-1/4 w-full z-20 bg-white bg-opacity-50 border-2 border-black border-opacity-35 rounded-xl p-2">
         <div className="text-center flex flex-col h-full justify-around">
            <p>Data Updated: {convertUnixTime(weatherData?.dt)}</p>
            <p>Worldwide Weather App!</p>
            <p>Current location will automatically loaded.</p>
            <p>Use the search field below to look up weather in other areas.</p>
         </div>
         <form
            onSubmit={handleSubmit}
            action="">
            <input
               placeholder="Search any city..."
               onChange={handleChange}
               value={city}
               className="bg-grey-500 w-60 rounded-xl pl-2 opacity-50 hover:scale-125"
               type="text"
            />
         </form>
      </div>
   );
};
