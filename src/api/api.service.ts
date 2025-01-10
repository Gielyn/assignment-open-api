import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5'; // Base URL for OpenWeatherMap
  private readonly apiKey = 'b0658461487e428507380c1ecb6bb4ad'; // OpenWeatherMap API key

  async getData(endpoint: string, params: Record<string, string>) {
    try {
      
      if (endpoint !== 'weather') {
        throw new Error('Invalid endpoint. Only "weather" is supported.');
      }

      // Make the API request for weather data
      const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
        params: { ...params, appid: this.apiKey },
      });

      return response.data;
    } catch (error) {
      // Log and throw exception if any error occurs
      console.error('Error fetching data from OpenWeatherMap:', error);

      // Throw a HttpException with error details
      throw new HttpException(
        error.response?.data || 'Error fetching data',
        error.response?.status || 500,
      );
    }
  }
}
