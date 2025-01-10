import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ApiKeyGuard } from './api-key.guard';

@Module({
  providers: [AuthService, ApiKeyGuard],
  controllers: [AuthController],
})
export class AuthModule {}
