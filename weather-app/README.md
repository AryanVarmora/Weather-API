# WeatherLook

A simple weather app built with Angular that returns real-time weather data for any US ZIP code.

## Features

- Search current weather by US ZIP code
- Displays temperature, feels like, humidity, and wind speed
- Toggle between °F and °C
- Search history for quick re-lookup
- Request timeout handling for invalid ZIP codes
- In-memory caching to avoid repeat API calls

## Tech Stack

- Angular 21 (standalone components)
- Tailwind CSS
- OpenWeatherMap API
- TypeScript

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/AryanVarmora/Weather-API.git
cd Weather-API/weather-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

Copy the example environment file:

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```

Then open `src/environments/environment.ts` and replace `ADD_YOUR_OPENWEATHERMAP_KEY_HERE` with your free API key from [openweathermap.org](https://openweathermap.org/api).

### 4. Run the app

```bash
ng serve
```

Open `http://localhost:4200` in your browser.

## Notes

- `environment.ts` is excluded from version control to keep the API key private
- The app uses RxJS `timeout(10000)` to fail fast on invalid ZIP codes
- Cached results are stored in memory per session to reduce API calls