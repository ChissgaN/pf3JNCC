import React from "react";
import cloudsBg from "../../public/Cloud-background.png";
import { LocationIcon } from "./Icons";

export default function Sidebar({weatherData,
    isFahrenheit}) {
  return (
    <div
      className="px-4 bg-blue-1 h-[860px] w-[100%] truncate max-sm:w-full 
          max-sm:py-[0] sm:w-[100%] sm:h-[950px] 
          md:h-screen
        "
    >
      <div className="flex flex-col items-center relative">
        <img
          className="w-36 absolute m-[35px] mt-[70px]

              sm:w-44 sm:h-44 sm:mt-[120px] max-sm:mt-[160px]
              
              "
          src={`/${weatherData.weather}.png`}
          alt={`/${weatherData.weather}`}
        />
        <div
          className="w-[100%] absolute  
              max-sm:w-[1200px] max-sm:pl-[180px] sm:w-[850px]"
        >
          <img
            className="h-auto opacity-10  
                max-sm:h-[450px] sm:w-[900px] 
                md:w-[650px] md:h-[376px] md:ml-[85px]
                "
            src={cloudsBg}
            alt=""
          />
        </div>
        <div
          className="absolute mt-5 top-[270px]
              sm:top-[400px] max-sm:top-[375px]
              "
        >
          <p className="text-[144px] font-medium">
            {isFahrenheit
              ? Math.floor(weatherData.temp * (9 / 5) + 32)
              : weatherData.temp}
            <span className="text-gray-2 text-5xl">
              {isFahrenheit ? "°F" : "°C"}
            </span>
          </p>
          <div className="flex flex-col justify-center items-center ">
            <p className="text-gray-2 text-4xl font-semibold pb-12">
              {weatherData.weather}
            </p>
            <div className="flex gap-4 text-gray-2  text-lg font-medium pb-6">
              <span>Today</span>
              <span>•</span>
              <span>{weatherData.dateFormat}</span>
            </div>
            <div className="flex mt-5 gap-3">
              <LocationIcon/>
              <p className="text-gray-2 text-lg font-semibold">
                {weatherData.locationName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
