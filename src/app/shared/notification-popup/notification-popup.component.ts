import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';  
@Component({
  selector: 'app-notification-popup',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './notification-popup.component.html',
  styleUrl: './notification-popup.component.css'
})
export class NotificationPopupComponent implements OnInit {
  SelectedObj:any = {}; 


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<NotificationPopupComponent>) { 
    debugger
    this.SelectedObj = data;
  }
 ngOnInit(): void {
   
 }
 
cancel(){
  this.dialogRef.close();
}
}
