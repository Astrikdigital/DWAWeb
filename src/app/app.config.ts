import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; 
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';   
import { pendingRequestsInterceptor$ } from 'ng-http-loader';



import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }), 
    
    provideRouter(routes, withHashLocation()),provideAnimations(),provideToastr(),provideHttpClient(withInterceptors([pendingRequestsInterceptor$])),
  
  
  ]
};