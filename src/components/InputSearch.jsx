import React, { useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import { UilSearch, UilLocationArrow, UilMapMarker } from '@iconscout/react-unicons'


const InputSearch = ({ setQuery, units, setUnits }) => {
    const [location, setLocation] = useState("");
    const [validResults, setValidResults] = useState([]);

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        setLocation(value);
        setValidResults(results);
        // console.log(results)
    }

    // Clicking on search icon
    const handleClick = () => {
        if (validResults.length == 0 || setValidResults === undefined )
            console.log("Input is empty");
        else {
            setQuery({q: location});
            setLocation("");
        }
    }

    // Clicking on the location icon
    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                setQuery({ lat, lon });
            })
        }
    }

    const handleUnitChange = (evt) => {
        const selectedUnit = evt.currentTarget.name;
        if (units !== selectedUnit) setUnits(selectedUnit);
    }


    return(
        <div className='flex items-center flex-row my-5 font-base text-gray-800 w-full py-4
                        md:px-[4%] sm:block
                        lg:px-0
                        xl:px-[6%]
                        2xl:px-[18%]
        '>
            <div className='flex flex-row w-full items-center justify-start space-x-4 sm:justify-center'> 
                <PlacesAutocomplete value={location} onChange={setLocation} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div key={suggestions.description}>
                        <input {...getInputProps({ placeholder: 'Search by city' })}
                            type='text' 
                            className='text-md font-light px-2 py-1 rounded-lg shadow-xl focus:outline-none capitalize placeholder:lowercase font-regular w-[400px] relative
                                    xs:text-xs xs:w-[250px]
                                    sm:text-sm 
                                    md:text-sm  md:w-[250px]  
                                                lg:w-[300px]
                                                xl:w-[350px] 
                        '/>
                        <div className="absolute text-start bg-white text-[12px] rounded-lg mt-3 text-gray-700">
                            {suggestions.map(suggestion => {          
                                return (
                                    <div className='flex items-center hover:bg-blue-100 hover:rounded-sm cursor-pointer p-1 bg-white'
                                        {...getSuggestionItemProps(suggestion)}
                                    >
                                        <UilMapMarker size={12} fill="gray"/>
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                </PlacesAutocomplete>

                {/* Icons */}
                <UilSearch fill="white" onClick={handleClick} className='cursor-pointer xs:w-[15px] sm:w-[18px]' />
                <UilLocationArrow fill="white" onClick={handleLocationClick} className='cursor-pointer xs:w-[15px] sm:w-[18px]' />
            </div>
            <div className='flex flex-row items-center justify-end text-white text-xl font-regular py-1
                            sm:justify-center 
            '>
                <div className='flex flex-row bg-gray-800/60 px-6 py-[2px] rounded-lg
                                sm:text-sm sm:mt-3 
                                md:text-base
                                lg:text-lg
                '>
                    <button name="metric" onClick={handleUnitChange}>°C</button>
                    <p className='mx-3'>|</p>
                    <button name="imperial" onClick={handleUnitChange}>°F</button>
                </div>
            </div>
        </div>
    )
}

export default InputSearch