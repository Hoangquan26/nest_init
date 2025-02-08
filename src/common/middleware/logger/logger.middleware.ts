import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    console.log(`Request...${new Date().toLocaleDateString()} - ${req.method} - ${req.credentials} - ${req.url}`);
    next();
  }
}
