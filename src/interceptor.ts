import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {Observable, map} from 'rxjs';
import {GqlExecutionContext} from '@nestjs/graphql';

@Injectable()
export class ElapsedTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const start = Date.now();
    const type = context.getType<'http'|'graphql'>();

    let req: any;
    let res: any;
    if (type==='http') {
      const httpCtx = context.switchToHttp();
      req = httpCtx.getRequest();
      res = httpCtx.getResponse();
    } else if (type==='graphql') {
      const gqlCtx = GqlExecutionContext.create(context).getContext<{req: any; res: any}>();
      req = gqlCtx.req;
      res = gqlCtx.res;
    }

    return next.handle().pipe(
      map((data: any) => {
        const elapsed = Date.now() - start;
        console.log(type === 'http' ? `[${req.method}] ${req.url} - ${elapsed}ms` : `[GraphQL] - ${elapsed}ms`);
        if (res?.setHeader) res.setHeader('X-Elapsed-Time', `${elapsed}ms`);
        if (type === 'http' && data && typeof data === 'object' && !Array.isArray(data)) {
          return {...data, elapsedTime: elapsed};
        }
        return data;
      }),
    );
  }
}