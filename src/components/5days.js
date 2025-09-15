import cloudy from '../img/clouds.png';

const FiveDaysForecast = ({ weatherData, wetterimg }) => {
    return (
        <div className="bg-gradient-to-br from-blue-800 to-purple-700 p-4 text-white rounded-xl">
          <h3 className="text-xl font-bold text-center mb-3">5-Tage Prognose</h3>
          <div className="grid grid-cols-1 gap-2">
            {weatherData['5_tages_vorhersage'] && weatherData['5_tages_vorhersage'].map((tag, index) => (
              <div key={index} className="flex flex-col items-center bg-white/10 rounded-lg p-2">
                <p className="font-semibold text-xs">{tag.datum}</p>
                <img 
                  src={wetterimg[tag.beschreibung] || cloudy} 
                  alt="Wetter Icon" 
                  className="w-8 h-8 my-1" 
                  onError={(e) => {
                    console.log('Bild-Ladefehler:', e.target.src);
                    e.target.src = cloudy;
                  }}
                />
                <p className="text-xs text-center">{tag.beschreibung}</p>
                <p className="text-sm font-bold mt-1">{tag.temperatur}</p>
              </div>
            ))}
          </div>
        </div>
    );
};

export default FiveDaysForecast;