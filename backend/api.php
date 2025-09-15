<?php
error_reporting(0);
ini_set('display_errors', 0);

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$api_key = trim(file_get_contents(getcwd() . '/key.env'));
$city = $_GET['city'] ? $_GET['city'] : 'Berlin';

$current_url = "https://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$api_key}&units=metric&lang=de";
$forecast_url = "https://api.openweathermap.org/data/2.5/forecast?q={$city}&appid={$api_key}&units=metric&lang=de";

$context = stream_context_create([
    'http' => [
        'timeout' => 10,
        'ignore_errors' => true
    ]
]);

$current_response = @file_get_contents($current_url, false, $context); 
$forecast_response = @file_get_contents($forecast_url, false, $context);

if ($current_response === FALSE) {
    echo json_encode(['fehler' => 'Verbindung zur Wetter-API fehlgeschlagen']);
    exit;
}

$current_data = json_decode($current_response, true);
$forecast_data = json_decode($forecast_response, true);

if (!$current_data || isset($current_data['cod']) && $current_data['cod'] !== 200) {
    echo json_encode(['fehler' => 'Stadt nicht gefunden oder API-Fehler']);
    exit;
}

$daily_forecast = [];
if ($forecast_data && isset($forecast_data['list'])) {
    $days_added = 0;
    $last_day = '';
    
    foreach ($forecast_data['list'] as $item) {
        $date = date('Y-m-d', $item['dt']);
        $day_name = '';
        
        switch ($days_added) {
            case 0: $day_name = 'Heute'; break;
            case 1: $day_name = 'Morgen'; break;
            case 2: $day_name = 'Übermorgen'; break;
            default: $day_name = date('D', $item['dt']); break;
        }
        
        if ($date != $last_day && strpos($item['dt_txt'], '12:00:00') !== false) {
            $daily_forecast[] = [
                'datum' => $day_name,
                'temperatur' => round($item['main']['temp']) . '°C',
                'beschreibung' => ucfirst($item['weather'][0]['description']),
            ];
            $last_day = $date;
            $days_added++;
            
            if ($days_added >= 5) break;
        }
    }
}

while (count($daily_forecast) < 5) {
    $daily_forecast[] = [
        'datum' => 'Tag ' . (count($daily_forecast) + 1),
        'temperatur' => round($current_data['main']['temp']) . '°C',
        'beschreibung' => ucfirst($current_data['weather'][0]['description']),
    ];
}

echo json_encode([
    'stadt' => $current_data['name'],
    'temperatur' => round($current_data['main']['temp']) . '°C',
    'beschreibung' => ucfirst($current_data['weather'][0]['description']),
    'gefuehlt' => 'Gefühlt: ' . round($current_data['main']['feels_like']) . '°C',
    'luftfeuchtigkeit' => $current_data['main']['humidity'] . '%',
    'windgeschwindigkeit' => $current_data['wind']['speed'] . ' m/s',
    '5_tages_vorhersage' => $daily_forecast
]);
?>
