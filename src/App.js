import React, { useEffect, useState } from 'react'
import InputSearch from "./components/InputSearch";
import LocationAndTime from './components/LocationAndTime';
import Details from './components/Details';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import getFormattedWeatherData from './services/weatherService';
import world from './media/world.mp4'

function App() {
    const [query, setQuery] = useState({ q: "potomac" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            await getFormattedWeatherData({ ...query, units }).then((data) => { 
                setWeather(data);
            //   console.log(data);
            });
        }; 
        fetchWeather();
    }, [query, units]);

    return (
        <div>
            <video src={world} type="video/mp4" controls={false} loop muted autoPlay playsInline className='w-full h-[130vh] object-cover bg-center' />
            {/* Overlay */}
            <div className='absolute bg-black/70 top-0 left-0 bottom-0 right-0 blur-sm w-full h-[130vh]' />
            <div>
                <div className='absolute left-1/2 transform -translate-x-1/2 justify-center items-center top-[2%] w-[80vw] p-10 bg-white/20 text-center rounded-3xl
                                xs:top-[2%] xs:w-[92vw] 
                                md:w-[90vw] md:p-5
                                lg:top-[3%] 
                                xl:w-[80vw]
                '>
                <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-100 to-red-500 tracking-wider font-days text-5xl -
                               xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
                '>
                    FORECAST <span className='tracking-reg'> 2.0</span>
                </h1>
                <InputSearch setQuery={setQuery} units={units} setUnits={setUnits} />
                    {!weather ? "" : (
                    <div>
                        <LocationAndTime weather={weather} />
                        <Details weather={weather} />
                        <HourlyForecast weather={weather} />
                        <DailyForecast weather={weather} />
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App