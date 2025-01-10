import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';
  private readonly apiKey = 'b0658461487e428507380c1ecb6bb4ad';

  async getData(endpoint: string, params: Record<string, string>) {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
        params: { ...params, appid: this.apiKey },
      });

      // Check if the data is for the "weather" endpoint
      if (endpoint === 'weather') {
        return this.formatWeatherData(response.data);  // Format the weather data
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching data from OpenWeatherMap:', error);
      throw new HttpException(
        error.response?.data || 'Error fetching data',
        error.response?.status || 500,
      );
    }
  }

  private formatWeatherData(data: any): string {
    const cityName = data.name;
    const temperature = data.main.temp - 273.15;  // Convert Kelvin to Celsius
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Format the weather data as a user-friendly message
    return `Weather in ${cityName}:
    Temperature: ${temperature.toFixed(1)}°C
    Condition: ${weatherDescription}
    Humidity: ${humidity}%
    Wind Speed: ${windSpeed} m/s`;
  }
}
