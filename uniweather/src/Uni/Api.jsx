import React from "react";
import './Style.css'
import { useState, useEffect } from "react";
import axios from 'axios';
import building from '../Img/building.png'
import pressure from '../Img/pressure.png'
import wet from '../Img/wet.png'
import wind from '../Img/wind.png'
import vis from '../Img/visiblity.png'
import 'animate.css';

export default function Api() {
    const [weatherData, setWeatherData] = useState(null);
    const [searchLocation, setSearchLocation] = useState('');
    const [error, setError] = useState(null);
    const [aqiData, setAqiData] = useState(null);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=73e0ebd16c8baf8838b2af42e24723cb`
            );
            setWeatherData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError(error.response.data.message);
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };

    const fetchAqiData = async () => {
        const options = {
            method: 'GET',
            url: 'https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality',
            params: { city: searchLocation },
            headers: {
                'X-RapidAPI-Key': '3e1c209175mshd280390482053d2p1aedcfjsna62d5aa47d85',
                'X-RapidAPI-Host': 'air-quality-by-api-ninjas.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setAqiData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching AQI data:', error);

        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeatherData();
        fetchAqiData();
       
       
    };

    
    
    const [placeholder, setPlaceholder] = useState('');
    const textStages = [
        { text: "C ity Name Only " },
        { text: "D elhi " },
        { text: "L ondon " },
        { text: "N ew York " },
        { text: "S ydney" },


    ];
    const speed = 100;
    let stageIndex = 0;
    let charIndex = 0;
    let eraseMode = true;
    useEffect(() => {
        const interval = setInterval(() => {
            if (!eraseMode) {
                if (charIndex < textStages[stageIndex].text.length) {
                    setPlaceholder(prevPlaceholder => prevPlaceholder + textStages[stageIndex].text.charAt(charIndex));
                    charIndex++;
                } else {
                    eraseMode = true;
                }
            } else {
                if (charIndex > 0) {
                    setPlaceholder(prevPlaceholder => prevPlaceholder.slice(0, -1));
                    charIndex--;
                } else {
                    eraseMode = false;
                    stageIndex = (stageIndex + 1) % textStages.length;
                }
            }
        }, speed);

        return () => clearInterval(interval);
    }, [Api]);

    const handleClose = () => {
        setError(null);
    };

    return (
        <>
            <div className="p-3">
                <div className="ok" name='ok' id='ok'>
                    <a href="/" className="p text-5xl font-extrabold subpixel-antialiased">
                        UniWeather
                    </a>
                </div>
                <br />


                <div className="p-8 rounded-xl" id='se'>
                    <form className="p-4 flex items-center justify-between ">
                        <input type="text"
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            className={`w-full p-3 font-semibold outline-none rounded-full text-center text-gray-700 ${textStages[stageIndex].color}`}
                            placeholder={placeholder} />
                        <button onClick={handleSearch} className="btnse relative inline-flex items-center justify-center me-2 overflow-hidden text-sm
        font-medium text-gray-900 rounded-lg group group-hover:from-red-500 group-hover:to-blue-500 hover:text-green-300
        dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd"
                                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 
        4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </form>
                </div>
                
                <div className="tst">
                    {error && (
                        <div id="toast-default" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z" />
                                </svg>
                                <span className="sr-only"></span>
                            </div>
                            <div className="ms-3 text-sm font-normal">
                                {error}  </div>
                            <button type="button" onClick={handleClose} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-800 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                                <span className="sr-only"></span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                    )}</div>
                {weatherData && (
                    <div className="weather-container">
                        <div className="weather-details">
                            <div className="tst">
                                <div className="text-white bg-transparent text-7xl font-bold ">
                                    {(weatherData.main.feels_like - 273.15).toFixed(2)} <sup>&#176;</sup><br />

                                    <p className="text-gray-300 text-lg mt-4 font-bold">Overcast <span>{(weatherData.main.temp_max - 273.15).toFixed(2)} &#8451;
                                    </span> / <span>{(weatherData.main.temp_min - 273.15).toFixed(2)} &#8451;</span> </p>
                                    <p className="text-gray-300 text-lg font-bold">Air Quality - <span>{aqiData && aqiData.O3.aqi}&nbsp; { (weatherData.weather[0].main)}
                                    </span></p></div>
                            </div><br />
                       
                            <div className="flex flex-wrap item-center w-full p-9 py-4 rounded-xl font-semibold italic text-green-900">
                                <div className="ddd flex-grow overflow-x-auto w-full overflow-y-hidden flex  text-center rounded-xl p-5 lg:justify-center md:item-center ">
                                    <div className="p-1 w-36 justify-center text-xs bg-purple-100 mb-2 me-4 ml-2 grid rounded-xl border" style={{ textAlign: 'center' }}>
                                        <img
                                            src={building}
                                            alt={weatherData.weather[0].description}
                                            className="weather-icon p-2 mx-auto animate__animated animate__fadeInUp"
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                        <h2 className="animate__animated animate__fadeInUp">{weatherData.name}, {weatherData.sys.country}<br /> {`${weatherData.timezone / 3600}+Gmt`}</h2>
                                    </div>

                                    <div className="p-4 w-36  justify-center text-xs bg-gray-300 mb-2 me-4 ml-2 grid rounded-xl border" style={{ textAlign: 'center' }}>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                                            alt={weatherData.weather[0].description}
                                            className="weather-icon mx-auto animate__animated animate__fadeInDown"
                                            style={{ maxWidth: '100%', height: 'auto'}}
                                        />
                                        <p className="animate__animated animate__fadeInDown">{weatherData.weather[0].description}</p>
                                        <h2 className="animate__animated animate__fadeInDown">{`${weatherData.clouds.all}`}</h2>
                                    </div>

                                    <div className="p-4 w-36 justify-center text-xs bg-pink-100 mb-2 me-4 ml-2 grid rounded-xl border" style={{ textAlign: 'center' }}>
                                        <img
                                            src={wet}
                                            alt={weatherData.weather[0].description}
                                            className="weather-icon p-2 mx-auto animate__animated animate__fadeInUp"
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                        <h5 className="animate__animated animate__fadeInUp">Humidity</h5>
                                        <h2 className="animate__animated animate__fadeInUp">{`${weatherData.main.humidity}`} %</h2>
                                    </div>

                                    <div className="p-4 w-36 justify-center text-xs bg-orange-100 mb-2 me-4 ml-2 grid rounded-xl border" style={{ textAlign: 'center' }}>
                                        <img
                                            src={pressure}
                                            alt={weatherData.weather[0].description}
                                            className="weather-icon p-2 mx-auto animate__animated animate__fadeInDown"
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                        <h5 className="animate__animated animate__fadeInDown">Air Pressure</h5>
                                        <h2 className="animate__animated animate__fadeInDown">{`${weatherData.main.pressure}`} hPa</h2>
                                    </div>


                                    <div className="p-4 w-36 justify-center item-center bg-red-100 text-xs mb-2 me-4 ml-2 grid rounded-xl border" style={{ textAlign: 'center' }}>
                                        <img
                                            src={wind}
                                            alt={weatherData.weather[0].description}
                                            className="weather-icon p-2 mx-auto animate__animated animate__fadeInUp"
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                        <h5>Wind</h5>
                                        <h2 className="animate__animated animate__fadeInUp">Speed {`${weatherData.wind.speed}`} mi/h</h2>
                                    </div>

                                    <div className="p-4 w-36 justify-center text-xs mb-2 me-4 bg-cyan-100 ml-2 grid rounded-xl border" style={{ textAlign: 'center' }}>
                                        <img
                                            src={vis}
                                            alt={weatherData.weather[0].description}
                                            className="weather-icon p-2 animate__animated animate__fadeInDown"
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                        <h5 className="animate__animated animate__fadeInDown">Visibility </h5>
                                        <h2 className="animate__animated animate__fadeInDown">{(weatherData.visibility * 0.000621371).toFixed(2)} miles</h2>

                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>
                )}

            </div>
            <footer class="bg-tansperent text-white p-4 fixed bottom-0 w-full">
  <div class="container mx-auto text-center">
    <p class="text-sm">&copy; designed by - Durgesh Malviya</p>
  </div>
</footer>


        </>
    )
}