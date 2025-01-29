import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpApiService } from '../../../services/http-api-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignalrService } from '../../../services/NotificationSignalR';
import { StorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  Notifications:any[]=[];
  lastScrollTop=0;
  NotificationModel:any = {PageNumber:1,NotificationTypeId:""};
  isLoading:boolean =false;
  notificationType:any[]=[];
  TotalRecord:number = 0;
  SelectedObj:any = {};
  User:any = {};
  
  constructor(private api:HttpApiService,private websocketService:SignalrService,private store:StorageService,private router:Router) {
    this.User= this.store.getItem("User");

  }
  async GetNotificationDll() {
    let res: any = await this.api.GetNotificationDll();
    if (res.statusCode == 200) {
      this.notificationType = res.notificationType; 
    }
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void { 
    const currentScrollTop = window.scrollY; 
    if (currentScrollTop > this.lastScrollTop && !this.isLoading && this.Notifications.length != this.TotalRecord) { 
      const scrollPosition = window.innerHeight + currentScrollTop;
      const documentHeight = document.documentElement.scrollHeight; 
      if (scrollPosition >= documentHeight - 100) {
        this.NotificationModel.PageNumber = this.NotificationModel?.PageNumber+1;
        this.GetNotifications(true); 
      }
    } 
    this.lastScrollTop = currentScrollTop;
  }
  ngOnInit(): void {
    this.GetNotifications();
    this.GetNotificationDll();
    this.websocketService.startConnection(); 
    this.ReceivedMessage();
  } 
 
  async GetNotifications(IsPagination:any=null){
    this.store.IsLoader = true;
    this.NotificationModel.UserId =  this.User.id;
    let res: any = await this.api.GetAllNotification(this.NotificationModel);
    if(res.statusCode == 200){
      if(!IsPagination){this.Notifications = res.data;}else{
        this.Notifications.push(...res.data);
       } 
       this.TotalRecord = res.data[0]?.totalRecords;
       this.store.IsLoader = false;
    }
  }
  ReceivedMessage(): void { 
    this.websocketService.messages$.subscribe((x:any)=>{ 
      if (x) {   
        x.IsRead = false;
        this.Notifications.unshift(x); 
        this.TotalRecord = this.TotalRecord+1;
        this.User.ReadCount = this.User.ReadCount + 1; 
      }
    });
  }
 async ViewDetail(obj:any,i:any){ 
    this.SelectedObj = obj;
    if(!obj.isRead){
    let object:any = {
      UserId:this.User.id,
      NotificationId:obj.id
    } 
    let res:any = await this.api.UpdateRead(object);
   if(res != null)     { 
      this.Notifications[i].isRead = true;  
      if(this.User.ReadCount>0){
        this.User.ReadCount = res.data;
        this.store.readCountSubject.next(this.User.ReadCount);
      this.store.setItem("User",this.User);
    }
  }
 }
    const button = document.getElementById('view-detail');
    button?.click();
  }
  
}
