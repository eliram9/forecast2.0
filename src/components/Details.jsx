import React, { useState } from 'react';
import Lottie from "lottie-react";
import { UilTear, UilArrowToBottom, UilTopArrowToTop, UilWind, UilSun, UilSunset, UilTemperatureThreeQuarter, UilEye } from '@iconscout/react-unicons'
import { formatSunsTime, getIcon } from '../services/weatherService';


const Details = ({weather: {details, temp, feels_like, humidity, speed, dt, visibility,
                  description, sunrise, sunset, timezone, temp_max, temp_min }}) => {

    const currentTime = formatSunsTime(dt, timezone);
    const icon = getIcon(details, currentTime);

    return (
        <div className='xs:-mx-[5%] 2xl:mx-[4%]'>
            <div className='flex items-center justify-center pt-3 text-xl text-blue-200'>
                <p>{details} - <span className='font-extralight'>{description}</span></p>
            </div>
            <div className='flex flex-row itmes-center justify-around text-white py-6'>
                <Lottie animationData={icon} className="w-20" />
                <p className='text-3xl font-light'>{temp.toFixed()}°</p>

                <div className='flex flex-col space-y-2 items-start justify-end'>
                    <div className='flex font-light text-sm items-center justify-center'>
                        <UilTemperatureThreeQuarter className='mr-2 xs:w-[15px] sm:w-[18px]' />
                        Feels like: 
                        <span className='font-medium ml-1 xs:font-normal xs:text-xs'> {feels_like.toFixed()}°</span>
                    </div>
                    <div className='flex font-light text-sm items-center justify-center'>
                        <UilTear className='mr-2 xs:w-[15px] sm:w-[18px]' />
                        Humidity: 
                        <span className='font-medium ml-1 xs:font-normal xs:text-xs'> {humidity.toFixed()}%</span>
                    </div>
                    <div className='flex font-extralight text-sm items-center justify-center'>
                        <UilWind className='mr-2 xs:w-[15px] sm:w-[18px]' />
                        Wind: 
                        <span className='font-medium ml-1 xs:font-normal xs:text-xs'> {speed} km/h</span>
                    </div>
                </div>  
            </div>

            <div className='flex flex-row items-center justify-center space-x-2 text-white test-sm py-3'>
                {/* <UilSun />
                <p className='font-light '>Rise: 
                    <span className='font-base ml-1'>
                        {formatSunsTime(sunrise, timezone)}
                    </span>
                </p>
                <p className='font-extralight text-2xl mb-1 space-x-[20px]'> | </p>
                
                <UilSunset />
                <p className='font-light '>Set: 
                    <span className='font-medium ml-1'>{formatSunsTime(sunset, timezone)}</span>
                </p> */}
                <UilArrowToBottom className='xs:w-[15px] sm:w-[18px]' fill="#ADCEE0" />
                <p className='font-light xs:text-xs  sm:text-sm'>Lowest: 
                    <span className='font-medium ml-1'>{temp_min.toFixed()}°</span>
                </p>

                <p className='font-extralight text-2xl mb-1'>|</p>

                <UilEye className='xs:w-[15px] sm:w-[18px]' fill="#FDF7C1" />
                <p className='font-light xs:text-xs sm:text-sm'>Visibility: 
                    <span className='font-medium ml-1'>{(visibility / 1000).toFixed(2)} km</span>
                </p>

                <p className='font-extralight text-2xl mb-1'>|</p>

                <UilTopArrowToTop className='xs:w-[15px] sm:w-[18px]' fill="#F79E84" />
                <p className='font-light xs:text-xs sm:text-sm'>Highest: 
                    <span className='font-medium ml-1'>{temp_max.toFixed()}°</span>
                </p>                
            </div>
        </div>
    )
}

export default Details