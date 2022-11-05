import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError, tap } from 'rxjs/operators';
  
  @Injectable()
  export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next
        .handle()
        .pipe(
            tap((responseBody) =>  {
                //this.yourService.yourFunction(context, responseBody)
                console.log("responseBody: ", responseBody);
            }),
            catchError(err => throwError(() => {
                err.success = false;
                return new HttpException(
                    {
                        'success':false,
                        'code':err.status,
                        'message':err.message,
                        'data':null
                    }
                    ,err.status);
            })),
        );
    }
  }
  