import axios from "axios";

export const GetGeoLocation = async (city) => {
   try {
      const apiKey = process.env.WEATHER_API_KEY;
      const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=&appid=${apiKey}`;
      const { data } = await axios(geoURL);
      const lat = data[0].lat;
      const lon = data[0].lon;
      const locationURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const locationData = await axios(locationURL);
      return locationData;
   } catch (error) {
      console.log(error);
   }
};

export const HandleUnsplashCall = async (value) => {
   const unsplashKey = "-ZmJEcvNWBWqMGYLxVIHfDFyoPIQWTKzgPBQg4yPIfo";
   console.log(unsplashKey);
   const unsplashURL = `https://api.unsplash.com/photos/random?query=${value}&client_id=${unsplashKey}`;

   try {
      const { data } = await axios(unsplashURL);
      return data;
   } catch (error) {
      console.log(error);
   }
};
