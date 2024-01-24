import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticateService } from './authenticate.service';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                     'x-access-token':` ${currentUser.token}`,
                     'token':` ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
