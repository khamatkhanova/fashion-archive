import * as crypto from 'crypto';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ETagInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    return next.handle().pipe(
      map((data) => {
        if (!res || !req) return data;
        const bodyString = JSON.stringify(data);
        const etag = crypto.createHash('md5').update(bodyString).digest('hex');
        res.setHeader('ETag', etag);
        res.setHeader('Cache-Control', 'private, max-age=3600');
        if (req.headers['if-none-match'] === etag) {
          res.status(304).end();
          return null;
        }
        return data;
      }),
    );
  }
}