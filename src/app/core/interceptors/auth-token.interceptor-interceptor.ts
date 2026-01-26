import { HttpInterceptorFn } from '@angular/common/http';
import { SKIP_AUTH } from './skip-auth.context';

export const authTokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
   if (req.context.get(SKIP_AUTH)) {
    return next(req);}

    const token = localStorage.getItem('access_token');
    if(!token)
    {
         return next(req);
    }
     const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
    return next(authReq);
};
