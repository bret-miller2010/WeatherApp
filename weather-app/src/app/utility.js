export const ConvertWindDirection = (degree) => {
   const value = Math.floor(Number(degree));
   if (value >= 360 && value <= 21) {
      return "N";
   } else if (value >= 22 && value <= 44) {
      return "NNE";
   } else if (value >= 45 && value <= 66) {
      return "NE";
   } else if (value >= 67 && value <= 89) {
      return "ENE";
   } else if (value >= 90 && value <= 111) {
      return "E";
   } else if (value >= 112 && value <= 134) {
      return "ESE";
   } else if (value >= 135 && value <= 156) {
      return "SE";
   } else if (value >= 157 && value <= 179) {
      return "SSE";
   } else if (value >= 180 && value <= 201) {
      return "S";
   } else if (value >= 202 && value <= 224) {
      return "SSW";
   } else if (value >= 225 && value <= 246) {
      return "SW";
   } else if (value >= 247 && value <= 269) {
      return "WSE";
   } else if (value >= 270 && value <= 291) {
      return "W";
   } else if (value >= 292 && value <= 314) {
      return "WNW";
   } else if (value >= 315 && value <= 336) {
      return "NW";
   } else if (value >= 337 && value <= 359) {
      return "NNW";
   } else {
      return "no data";
   }
};

export const convertUnixTime = (unixTime) => {
   const milliseconds = unixTime * 1000;
   const dateObject = new Date(milliseconds);
   const currentDate = dateObject.toLocaleString();
   return currentDate;
};
