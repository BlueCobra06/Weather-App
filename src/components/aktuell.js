const aktuell = ({ weatherData, wetterimg }) => {
    return (
        <div className="flex flex-col items-center bg-gradient-to-br from-blue-800 to-purple-700 p-4 text-white rounded-xl">
            <h3 className="text-xl font-bold">{weatherData.stadt}</h3>
            <p className="text-3xl font-bold">{weatherData.temperatur}</p>
            <p className="text-sm opacity-75">{weatherData.beschreibung}</p>
            <p className="text-sm bg-white/10 p-2 rounded-full mb-2 mt-1">{weatherData.gefuehlt}</p>
            <div className="w-full h-0.5 bg-white/10 rounded-full mb-2"></div>
                <div className="flex flex-row w-full gap-4 justify-center">
                    <div className="w-full flex flex-col items-center bg-white/10 rounded-lg p-2">
                        <p className="text-xs opacity-75">Luftfeuchtigkeit</p>
                        <p className="font-semibold">{weatherData.luftfeuchtigkeit}</p>
                    </div>
                    <div className="w-full flex flex-col items-center bg-white/10 rounded-lg p-2">
                      <p className="text-xs opacity-75">Wind</p>
                      <p className="font-semibold">{weatherData.windgeschwindigkeit}</p>
                    </div>
                </div>   
        </div>
    );
};

export default aktuell;