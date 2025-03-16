import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  // TODO: Quitar el null una vez haya sido completado el login
  const token = localStorage.getItem('token') ?? null;

  if (token) {
    const clonedRequest = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;
    return next(clonedRequest);
  }

  return next(req);
};
