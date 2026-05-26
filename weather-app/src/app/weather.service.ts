import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of, timeout, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = environment.weatherApiKey;
  private cache: { [zip: string]: any } = {};

  constructor(private http: HttpClient) {}

  getWeatherByZip(zip: string) {
    if (this.cache[zip]) {
      return of(this.cache[zip]);
    }

    return this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${this.apiKey}&units=imperial`
    ).pipe(
      timeout(10000),
      map(data => {
        const result = {
          city: data.name,
          state: data.sys.country,
          temp: Math.round(data.main.temp),
          feels: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          wind: Math.round(data.wind.speed),
          code: data.weather[0].main,
          description: data.weather[0].description
        };
        this.cache[zip] = result;
        return result;
      }),
      catchError(err => {
        if (err.name === 'TimeoutError') {
          return throwError(() => new Error('timeout'));
        }
        return throwError(() => err);
      })
    );
  }
}