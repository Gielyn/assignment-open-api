import { Controller, Get, Query } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('data')
  async fetchData(@Query() query: { endpoint: string; q: string }) {
    // Ensure the endpoint is 'weather' and validate required parameters
    if (query.endpoint !== 'weather') {
      throw new Error('Invalid endpoint. Only "weather" is supported.');
    }

    // Ensure the city (q) parameter is provided for the weather endpoint
    if (!query.q) {
      throw new Error('City (q) parameter is required for the weather endpoint');
    }

    // Fetch weather data from the service
    return this.apiService.getData(query.endpoint, { q: query.q });
  }
}
