import React, { useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import { UilSearch, UilLocationArrow, UilMapMarker } from '@iconscout/react-unicons'


const InputSearch = ({ weather, setQuery, units, setUnits }) => {
    const [location, setLocation] = useState("");
    const [validResults, setValidResults] = useState([]);
    const [serachOnEmpty, setSearchOnEmpty] = useState(false);

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        setLocation(value);
        setValidResults(results);
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

    // Clicking on search icon
    const handleClick = () => {
        if (validResults.length == 0 || validResults === undefined || location.length === 0 ) {
            setSearchOnEmpty(true)
        }
            
        else {
            setQuery({q: location});
            setSearchOnEmpty(false)
            setLocation("");
        }
    }

    const searchOnEnterKey = (evt) => {
        if (evt.key === 'Enter') {
            handleClick();
        }
    }

    return(
        <div className='flex items-center flex-row my-5 font-base text-gray-800 w-full py-4
                        md:px-[4%] sm:block
                        lg:px-[5%]
                        xl:px-[8%]
                        2xl:px-[15%]
        '>
            <div className='flex flex-row w-full items-center justify-start space-x-4 sm:justify-center'> 
                <PlacesAutocomplete value={location} onChange={setLocation} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div key={suggestions.description}>
                        <input {...getInputProps()}
                            type='text' 
                            required
                            placeholder="search by city"
                            onKeyDown={searchOnEnterKey}
                            className='text-md font-light px-2 py-1 rounded-lg shadow-xl focus:outline-none capitalize placeholder:lowercase font-regular w-[400px] relative
                                    xs:w-[200px]
                                    sm:text-sm 
                                    md:text-sm  md:w-[250px]  
                                                lg:w-[250px]
                                                xl:w-[350px] 
                        '/>
                        {/* Alert message */}
                        <p className='absolute text-red-300 mt-[0px] text-xs xs:mt-[-45px]'>{
                            serachOnEmpty === true ? "*must enter city!" : ""
                        }</p>
                        
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
                <UilSearch fill="white" onClick={handleClick} className='cursor-pointer xs:w-[17px] sm:w-[20px]' />
                <UilLocationArrow fill="white" onClick={handleLocationClick} className='cursor-pointer xs:w-[17px] sm:w-[20px]' />
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