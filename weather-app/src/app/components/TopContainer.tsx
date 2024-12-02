import React from "react";
import { Weather } from "../types/types";

export const TopContainer = ({
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
    <div className="z-20 flex h-1/6 w-full flex-col items-center gap-y-2 rounded-xl border-2 border-black border-opacity-35 bg-white bg-opacity-50 p-2 backdrop-blur-sm">
      <form onSubmit={handleSubmit} action="">
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
