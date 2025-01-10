import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';

@Controller('protected')
export class AuthController {
  @Get('data')
  @UseGuards(ApiKeyGuard)
  getProtectedData() {
    return { message: 'This is protected data!' };
  }
}
