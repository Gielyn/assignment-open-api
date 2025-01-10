import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

      // If data is for "weather" endpoint
      if (endpoint === 'weather') {
        return this.formatWeatherData(response.data);
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching data from OpenWeatherMap:', error);

      // Error handling based on different scenarios
      if (error.response) {
        if (error.response.status === 401) {
          throw new HttpException('Invalid API Key', HttpStatus.UNAUTHORIZED);
        }
        if (error.response.status === 404) {
          throw new HttpException('City not found', HttpStatus.NOT_FOUND);
        }
        return new HttpException(
          'Error fetching data from OpenWeatherMap',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // Handle other errors (network issues, etc.)
      if (error.request) {
        return new HttpException(
          'Network error or request timeout',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      return new HttpException(
        'An unknown error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private formatWeatherData(data: any): string {
    const cityName = data.name;
    const temperature = data.main.temp - 273.15; // Convert Kelvin to Celsius
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    return `Weather in ${cityName}:
    Temperature: ${temperature.toFixed(1)}°C
    Condition: ${weatherDescription}
    Humidity: ${humidity}%
    Wind Speed: ${windSpeed} m/s`;
  }
}
