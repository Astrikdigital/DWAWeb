import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpApiService } from '../../../services/http-api-service';
import { StorageService } from '../../../services/local-storage.service';
import { AuthApiService } from '../../../services/auth-api.service';
import { AuthService } from '../../../auth/auth.service';
import { AlertService } from '../../../services/alert.service';
import { HttpService } from '../../../services/http.service';
@Component({
  selector: 'app-query-compose',
  imports: [CommonModule,FormsModule, AngularEditorModule,HttpClientModule],
  standalone: true,
  templateUrl: './query-compose.component.html',
  styleUrl: './query-compose.component.css',
  providers: [HttpService, AlertService, StorageService,AuthService,AuthApiService,HttpApiService,DatePipe]
})
export class QueryComposeComponent implements OnInit {
  selectedQuery: any = {};
  QueryModel: any = {};
  User: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<QueryComposeComponent>,private api:HttpApiService,private Store:StorageService) {
    this.selectedQuery = data;
    this.User =this.Store.getItem("User");
    this.QueryModel.Subject =this.selectedQuery.Subject; 
  }
  ngOnInit(): void {
    
  }
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  async Upload($event:any){
    this.QueryModel.Files = [];
    if($event.target.files){
      this.QueryModel.Files =  $event.target.files;
    } 
  }
  async onSubmit(){
    let ToUserId = 0;
    if(parseInt(this.User.id) == parseInt(this.selectedQuery?.ToUserId)) ToUserId =ToUserId = this.selectedQuery?.FromUserId;
    else ToUserId = this.selectedQuery?.ToUserId
    var obj:any = {
      CourseFacultyId:this.selectedQuery.CourseFacultyId,
      SemesterCourseId:this.selectedQuery.SemesterCourseId,
      FromUserId:this.User.id,
      ToUserId:ToUserId,
      ThreadId:this.selectedQuery?.ThreadId,
      IsOwner:this.selectedQuery?.ThreadId ? false : true,
      Subject:this.selectedQuery?.ThreadId ? null : this.QueryModel.Subject,
      Body:this.QueryModel.Body,
      ThreadStatusId:1,
      Attachments:this.QueryModel.Files,
    }
    let res:any = await this.api.AddQuery(obj); 
    if(res) this.dialogRef.close(true);
  }
  ClosePopup(){
    this.dialogRef.close(false);
  }
}
