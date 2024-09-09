import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatabaseOperationService } from './database-operation.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private dbService: DatabaseOperationService) { }  // DI

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authToken = this.dbService.getToken();  // T

    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + authToken
      }
    });
    return next.handle(req);
  }
}