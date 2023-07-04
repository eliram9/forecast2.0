import { DateTime } from "luxon";
import DayClearSky from '../icons/DayClearSky.json'
import DayClouds from '../icons/DayClouds.json'
import DayMist from '../icons/DayMist.json'
import DayRain from '../icons/DayRain.json'
import DayThunderstorm from '../icons/DayThunderstorm.json'
import DaySnow from '../icons/DaySnow.json'
import NightClearSky from '../icons/NightClearSky.json'
import NightClouds from '../icons/NightClouds.json'
import NightRain from '../icons/NightRain.json'
import NightThunderstorm from '../icons/NightThunderstorm.json'
import NightSnow from '../icons/NightSnow.json'
import NightMist from '../icons/NightMist.json'


const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    return fetch(url).then((res) => res.json());
};


const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        visibility
    } = data;

  const { main: details, description } = weather[0];

    return ({
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        description,
        speed,
        visibility
    });
};


const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            time: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            temp: d.temp.day,
            details: d.weather[0].main,
            min: d.temp.min
        };
    });

    hourly = hourly.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            temp: d.temp,
            dt: d.dt,
            timezone: timezone,
            details: d.weather[0].main
            // icon: d.weather[0].icon
        };
    });

  return { timezone, daily, hourly };
};


const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather",searchParams).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("onecall", {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units,
    }).then(formatForecastWeather);

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};


const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL. yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);


const formatSunsTime = (
    secs,
    zone,
    format = "hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// Day Night Checker
const isItNightOrDay = (currentTime) => {
    const timeRegex = /^(\d{1,2}):(\d{2})\s(AM|PM)$/;

    // Extract hours, minutes, and period (AM/PM) using regular expressions
    const matches = currentTime.match(timeRegex);
    if (!matches) {
        return 'Invalid time format';
    }

    const hours = parseInt(matches[1], 10);
    // const minutes = parseInt(matches[2], 10);
    const period = matches[3];

    // Convert to military hours (24-hour format)
    let militaryHours = hours;
    if (period === 'PM' && hours !== 12) {
        militaryHours += 12;
    } else if (period === 'AM' && hours === 12) {
        militaryHours = 0;
    }

    // Determine if it's night or day based on military hours
    if (militaryHours >= 0 && militaryHours < 6) {
        return 'night';
    } else if (militaryHours >= 6 && militaryHours < 18) {
        return 'day';
    } else {
        return 'night';
    }
}

const icons ={
    "day": {
        "clear": DayClearSky,
        "clouds": DayClouds,
        "rain": DayRain,
        "snow": DaySnow,
        "mist": DayMist,
        "thunderstorm": DayThunderstorm
    },
    "night": {
        "clear": NightClearSky,
        "clouds": NightClouds,
        "rain": NightRain,
        "snow": NightSnow,
        "mist": NightMist,
        "thunderstorm": NightThunderstorm
    },
}

const dayOrNight = (currentTime) => {
    const timeRegex = /^(\d{1,2}):(\d{2})\s(AM|PM)$/;

    // Extract hours, minutes, and period (AM/PM) using regular expressions
    const matches = currentTime.match(timeRegex);
    if (!matches) {
        return 'Invalid time format';
    }

    const hours = parseInt(matches[1], 10);
    // const minutes = parseInt(matches[2], 10);
    const period = matches[3];

    // Convert to military hours (24-hour format)
    let militaryHours = hours;
    if (period === 'PM' && hours !== 12) {
        militaryHours += 12;
    } else if (period === 'AM' && hours === 12) {
        militaryHours = 0;
    }

    // Determine if it's night or day based on military hours
    if (militaryHours >= 0 && militaryHours < 6) {
        return 'night';
    } else if (militaryHours >= 6 && militaryHours < 18) {
        return 'day';
    } else {
        return 'night';
    }
} 

const getIcon = (details, currentTime) => {
    const iconType = details.toLowerCase();
    // Day or Night Checker
    const dayOrNight = () => {
        const timeRegex = /^(\d{1,2}):(\d{2})\s(AM|PM)$/;

        // Extract hours, minutes, and period (AM/PM) using regular expressions
        const matches = currentTime.match(timeRegex);
        if (!matches) {
            return 'Invalid time format';
        }

        const hours = parseInt(matches[1], 10);
        // const minutes = parseInt(matches[2], 10);
        const period = matches[3];

        // Convert to military hours (24-hour format)
        let militaryHours = hours;
        if (period === 'PM' && hours !== 12) {
            militaryHours += 12;
        } else if (period === 'AM' && hours === 12) {
            militaryHours = 0;
        }

        // Determine if it's night or day based on military hours
        if (militaryHours >= 0 && militaryHours < 6) {
            return 'night';
        } else if (militaryHours >= 6 && militaryHours < 18) {
            return 'day';
        } else {
            return 'night';
        }
    } 
    const dayOrNightValue = dayOrNight();
    // return icons [dayOrNight][iconType]; 
    return icons [dayOrNightValue][iconType];
}

const getHourlyIcons = ([details, currentTime]) => {
    const iconType = details.toLowerCase();
    // Day or Night Checker
    const dayOrNight = () => {
        const timeRegex = /^(\d{1,2}):(\d{2})\s(AM|PM)$/;

        // Extract hours, minutes, and period (AM/PM) using regular expressions
        const matches = currentTime.match(timeRegex);
        if (!matches) {
            return 'Invalid time format';
        }

        const hours = parseInt(matches[1], 10);
        // const minutes = parseInt(matches[2], 10);
        const period = matches[3];

        // Convert to military hours (24-hour format)
        let militaryHours = hours;
        if (period === 'PM' && hours !== 12) {
            militaryHours += 12;
        } else if (period === 'AM' && hours === 12) {
            militaryHours = 0;
        }

        // Determine if it's night or day based on military hours
        if (militaryHours >= 0 && militaryHours < 6) {
            return 'night';
        } else if (militaryHours >= 6 && militaryHours < 18) {
            return 'day';
        } else {
            return 'night';
        }
    } 
    const dayOrNightValue = dayOrNight();
    // return icons [dayOrNight][iconType]; 
    return icons [dayOrNightValue][iconType];
}


export default getFormattedWeatherData;

export { formatToLocalTime, formatSunsTime, getIcon, dayOrNight, getHourlyIcons };