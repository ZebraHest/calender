import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';




export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
  ],
};


