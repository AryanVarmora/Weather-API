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
  isCelsius = false;
  history: { zip: string; city: string }[] = [];

  constructor(private weatherService: WeatherService) {}

  getWeather(zipOverride?: string) {
    const zip = zipOverride || this.zip;

    if (!/^\d{5}$/.test(zip)) {
      this.error = 'Please enter a valid 5-digit ZIP code.';
      this.weather = null;
      return;
    }

    this.zip = zip;
    this.error = '';
    this.loading = true;
    this.weather = null;

    const timeout = setTimeout(() => {
      this.error = 'Request timed out. ZIP code may be invalid.';
      this.loading = false;
      this.weather = null;
    }, 10000);

    this.weatherService.getWeatherByZip(zip).subscribe({
      next: (data) => {
        clearTimeout(timeout);
        this.weather = data;
        this.loading = false;
        this.addToHistory(zip, data.city);
      },
      error: (err) => {
        clearTimeout(timeout);
        if (err.message === 'timeout') {
          this.error = 'Request timed out. Please try again.';
        } else {
          this.error = 'ZIP code not found. Please try again.';
        }
        this.loading = false;
      }
    });
  }

  addToHistory(zip: string, city: string) {
    this.history = this.history.filter(h => h.zip !== zip);
    this.history.unshift({ zip, city });
    if (this.history.length > 5) this.history.pop();
  }

  getTemp(f: number): string {
    if (this.isCelsius) {
      return Math.round((f - 32) * 5 / 9) + '°C';
    }
    return f + '°F';
  }

  toggleUnit() {
    this.isCelsius = !this.isCelsius;
  }
}