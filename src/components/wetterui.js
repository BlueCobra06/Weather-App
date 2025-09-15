import cloudy from '../img/clouds.png';
import Länder from './länder';

const WeatherUI = ({ stadt, setStadt, land, setLand, wetterHolen, error, weatherData, activeTab, setActiveTab, wetterimg, Aktuell, FiveDaysForecast }) => {
    return (
        <div className="min-h-screen bg-indigo-950 flex items-center justify-center">
            <div className="bg-indigo-900 rounded-2xl shadow-2xl p-6 max-w-md w-full">
                <div className="w-20 h-20 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-5xl">☁️</span>
                </div>
                <h1 className="text-indigo-100 font-bold text-xl flex items-center justify-center">Wetter App</h1>
                <h2 className="text-gray-300 font-bold text-lg flex items-center justify-center">Aktuell & 5-Tage Prognose</h2>
                <div className="flex flex-row gap-2">
                    <input
                        id="stadt"
                        type="text"
                        placeholder="Stadt eingeben"
                        className="flex-1 mt-2 p-3 rounded-xl bg-blue-800 text-indigo-100 placeholder-indigo-300 border border-purple-700"
                        value={stadt}
                        onChange={(e) => setStadt(e.target.value)}
                    />
                    <select
                        id="land"
                        className="w-full mt-2 p-3 rounded-xl bg-blue-800 text-indigo-100 border border-purple-700 cursor-pointer"
                        value={land}
                        onChange={(e) => setLand(e.target.value)}
                    >
                        <Länder />
                    </select>
                </div>  
                <button onClick={wetterHolen} className="mt-2 w-full text-white px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-700">
                    Wetter & Prognose
                </button>
                <div id="ergebnis" className="mt-4">
                    {error && (
                        <p className="text-red-400">{error}</p>
                    )}

                    {weatherData && (
                        <div>
                            <div className="flex gap-1 mb-3">
                                <button className={`w-full px-4 py-2 rounded-lg ${activeTab === 'aktuell' ? 'bg-indigo-500 text-white' : 'bg-indigo-800 text-indigo-300'}`} onClick={() => setActiveTab('aktuell')}>Aktuell</button>
                                <button className={`w-full px-4 py-2 rounded-lg ${activeTab === '5-tage' ? 'bg-indigo-500 text-white' : 'bg-indigo-800 text-indigo-300'}`} onClick={() => setActiveTab('5-tage')}>5-Tage</button>
                            </div>
                            {activeTab === 'aktuell' && (
                                <Aktuell weatherData={weatherData} wetterimg={wetterimg} />
                            )}
                            
                            {activeTab === '5-tage' && (
                                <FiveDaysForecast weatherData={weatherData} wetterimg={wetterimg} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherUI;