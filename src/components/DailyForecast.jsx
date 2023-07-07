import React from 'react'
import Lottie from "lottie-react";
import { getHourlyIcons } from '../services/weatherService';


const DailyForecast = ({weather: {daily}}) => {
    const days = daily; 
    // console.log(days)

    const timeAndDetails = daily.map((item) => {
        return [item.details, item.time]
    });

    // List of icons based on timeAndDetails array
    const icons = timeAndDetails.map((item) => getHourlyIcons(item));

    // Creating a new array of objects by adding icons array as a key and value
    const dailyDetails = days.map((obj, index) => {
        return {...obj, icon:icons[index]}
    });    


    return (
        <div className='xs:mx-[3%] sm:mx-[4%] md:mx-[6%] lg:mx-[8%] mx-[15%] text-white pt-2'>
            <div className='flex items-center justify-start mt-6 mb-2'>
                <p className='xs:text-sm font-medium uppercase'>daily forecast</p>
            </div>
            <hr />
            <div className='flex flex-row items-center justify-between mt-4'>
                {dailyDetails.map((day) => 
                    <div className='flex flex-col items-center justify-center' key={day.title}>
                        <p className='font-light text-sm'>{day.title}</p>
                        <Lottie animationData={day.icon} className='w-7 my-2' />
                        <p className='font-light text-sm xs:text-xs'>{day.min.toFixed()}° - {day.temp.toFixed()}°</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DailyForecast