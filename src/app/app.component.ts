import { Component, OnInit } from '@angular/core';  
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';
import { StorageService } from '../services/local-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { AuthApiService } from '../services/auth-api.service';  
import { HttpApiService } from '../services/http-api-service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';  
import { SignalrService } from '../services/NotificationSignalR';
import { AuthGuard } from '../auth/auth.guard';
import { AngularEditorModule, AngularEditorService } from '@kolkov/angular-editor';
import { NgHttpLoaderComponent, Spinkit } from 'ng-http-loader';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,NgIf,AngularEditorModule,NgHttpLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpService, AlertService, StorageService,AuthService,AuthApiService,HttpApiService,DatePipe,SignalrService,AuthGuard,
    AngularEditorService,

    {
      provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE,
        MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: false, zone: 'Asia/Karachi' } // Set the timezone here
    },

  ],
 
})
export class AppComponent implements OnInit {
  public spinkit = Spinkit;
  title = 'converge';
  Notifications:any[]=[]
    constructor(public store:StorageService,private route:Router){

    }
  ngOnInit(): void {
    if(!this.store.getItem("User")){
      this.route.navigate(['/login']);
    }   
  }

 
}