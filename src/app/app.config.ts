import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiBaseUrlInterceptor } from './core/interceptors/api-base-url.interceptor';
import { authTokenInterceptorInterceptor } from './core/interceptors/auth-token.interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([ApiBaseUrlInterceptor, authTokenInterceptorInterceptor]))
  ]
};
