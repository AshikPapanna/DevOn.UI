import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  throwError,
} from 'rxjs'
import { AuthService } from '../auth/auth.service'
import { Router } from '@angular/router'
import { LoaderService } from '../shared/loader.service'

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router,private loaderService:LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const path = window.location.pathname.split('/').slice(-1).pop()
    this.loaderService.addLoader(path)
    let key = this.authService.ApiKey && this.authService.ApiKey.value
    if (key) {
      let apiReq = request.clone({
        headers: request.headers.set('x-api-key', key),
      })
      return next.handle(apiReq).pipe(
        map((event) => {
          this.loaderService.removeLoader(path)
          return event
        }),
        catchError((err: any) => {
          this.loaderService.removeLoader(path)
          return throwError(() => new Error(err))
        }),
      )
    }
    return next.handle(request).pipe(
      map((event) => {
        this.loaderService.removeLoader(path)
        return event
      }),
      catchError((err: any) => {
        this.loaderService.removeLoader(path)
        return throwError(() => new Error(err))
      }),
    )
  }
 
}
