import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKey = 'b0658461487e428507380c1ecb6bb4ad'; 

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];  // The key used in the header

    if (apiKey !== this.apiKey) {
      throw new ForbiddenException('Invalid API Key');
    }
    return true;
  }
}
