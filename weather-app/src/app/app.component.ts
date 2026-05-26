import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  zip = '';
  weather: any = null;
  error = '';
  loading = false;

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if (!/^\d{5}$/.test(this.zip)) {
      this.error = 'Please enter a valid 5-digit ZIP code.';
      this.weather = null;
      return;
    }

    this.error = '';
    this.loading = true;
    this.weather = null;

    this.weatherService.getWeatherByZip(this.zip).subscribe({
      next: (data) => {
        this.weather = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'ZIP code not found. Please try again.';
        this.loading = false;
      }
    });
  }

  getCondition(code: number): string {
    const conditions: { [key: number]: string } = {
      0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
      45: 'Foggy', 48: 'Icy Fog', 51: 'Light Drizzle', 53: 'Drizzle',
      61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain',
      71: 'Light Snow', 73: 'Snow', 75: 'Heavy Snow',
      95: 'Thunderstorm', 99: 'Thunderstorm with Hail'
    };
    return conditions[code] ?? 'Unknown';
  }
}