import React from 'react'
import Lottie from "lottie-react";
import { getHourlyIcons } from '../services/weatherService';


const HourlyForecast = ({weather: {hourly}}) => {
    const hours = hourly; 
    // console.log(hours)

    const timeAndDetails = hourly.map((item) => {
        return [item.details, item.title]
    });

    // List of icons based on timeAndDetails array
    const icons = timeAndDetails.map((item) => getHourlyIcons(item));

    // Creating a new array of objects by adding icons array as a key and value
    const hourlyDetails = hours.map((obj, index) => {
        return {...obj, icon:icons[index]}
    });    

    return (
        <div className='xs:mx-[3%] sm:mx-[4%] md:mx-[6%] lg:mx-[8%] mx-[15%] text-white'>
            <div className='flex items-center justify-start mt-6 mb-2'>
                <p className='xs:text-sm font-medium uppercase'>hourly forecast</p>
            </div>
            <hr />
            <div className='flex flex-row items-center justify-between mt-4'>
                {hourlyDetails.map((item) => 
                    <div className='flex flex-col items-center justify-center' key={item.title}>
                        <p className='font-light text-sm xs:text-xs'>{item.title}</p>
                        <Lottie animationData={item.icon} className='w-7 my-2' />
                        <p className='font-light text-sm'>{item.temp.toFixed()}°</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HourlyForecast