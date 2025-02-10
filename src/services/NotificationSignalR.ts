import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './local-storage.service';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class SignalrService {
    private messageSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public messages$ = this.messageSubject.asObservable();
    audioPlayer: HTMLAudioElement = new Audio('assets/bell.wav');

    public User: any = {};

    constructor(private Store: StorageService
    ) {
        this.User = this.Store.getItem("User");

    }

   
    hubConnection: any = signalR.HubConnection;
 
}