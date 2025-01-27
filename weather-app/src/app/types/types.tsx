export type Weather = {
   coord: Coord;
   weather: WeatherElement[];
   base: string;
   main: Main;
   visibility: number;
   wind: Wind;
   snow: Snow;
   clouds: Clouds;
   dt: number;
   sys: Sys;
   timezone: number;
   id: number;
   name: string;
   cod: number;
};

export type Clouds = {
   all: number;
};

export type Coord = {
   lon: number;
   lat: number;
};

export type Main = {
   temp: number;
   feels_like: number;
   temp_min: number;
   temp_max: number;
   pressure: number;
   humidity: number;
   sea_level: number;
   grnd_level: number;
};

export type Snow = {
   "1h": number;
};

export type Sys = {
   type: number;
   id: number;
   country: string;
   sunrise: number;
   sunset: number;
};

export type WeatherElement = {
   id: number;
   main: string;
   description: string;
   icon: string;
};

export type Wind = {
   speed: number;
   deg: number;
   gust: number;
};

export type City = {
   name: string;
   id: number;
   high: number;
   low: number;
   icon: string;
};
