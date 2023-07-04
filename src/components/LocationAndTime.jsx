import React from 'react'
import { formatToLocalTime } from '../services/weatherService'

const LocationAndTime = ({weather: {name, country, dt, timezone }}) => {
    return (
        <>
        <div className='items-center justify-center my-4 text-white'>
            <p className='text-xl font-light xs:text-[0.9rem]
            
            '>{
                formatToLocalTime(dt, timezone)}
            </p>
            <div className='items-center justify-center my-4'>
                <p className='text-3xl font-light xs:text-[25px]'>{name}, {country}</p>
            </div>
        </div>
        </>
    )
}

export default LocationAndTime